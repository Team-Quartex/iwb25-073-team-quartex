import ballerina/http;
// import ballerina/jwt;
import ballerina/sql;
import ballerina/io;

listener http:Listener httpDefaultListener = http:getDefaultListener();

@http:ServiceConfig {
    cors: {
        allowHeaders: ["content-type"],
        allowMethods: ["GET","POST"],
        allowOrigins: ["*"]
    }
}
service /user on httpDefaultListener {
    resource function post login(http:Caller caller, http:Request req) returns error? {
        json|error loginPayload = req.getJsonPayload();

        if loginPayload is json {
            string email = (check loginPayload.email).toString();
            string password = (check loginPayload.password).toString();

            // ✅ queryRow to get single user
            record {| int userId; string email; string password; |}? user =
                check mysqlClient->queryRow(`SELECT userId, email, password FROM user 
                               WHERE email=${email} AND password=${password}`);

            if user is record {| int userId; string email; string password; |} {
                json res = {
                    status: "success",
                    message: "Login successful",
                    data: {
                        userId: user.userId,
                        email: user.email,
                        password: user.password,
                        userType: "user"
                    }
                };
                check caller->respond(res);
                // io:print("hellow world3");
                // jwt:IssuerConfig jwtIssuerConfig = {
                //     username: user.email,
                //     issuer: "wso2",
                //     audience: "vEwzbcasJVQm1jVYHUHCjhxZ4tYa",
                //     expTime: 3600,
                //     signatureConfig: {
                //         algorithm: jwt:RS256,
                //         config: {
                //             keyFile: "/complaintSL_service/private.key" // Path to your private key file
                //         }
                //     }
                // };

                // string|error token = jwt:issue(jwtIssuerConfig);

                // if token is string {
                //     io:print("hellow world4");
                //     io:print(token);
                //     json res = { "status": "success", "message": "Login successful", "token": token };
                //     check caller->respond(res);
                // } else {
                //     io:print(token);
                //     json res = { "status": "fail", "message": "Error generating token" };
                //     check caller->respond(res);
                // }
            } else {
                io:print("hellow world6");
                json res = { "status": "fail", "message": "Invalid email or password" };
                check caller->respond(res);
            }
        } else {
            io:print("hellow world7");
            json res = { "status": "error", "message": "Invalid request body" };
            check caller->respond(res);
        }
    }


    resource function post signup(http:Request req)
        returns error|http:Response {

        json|error payload = req.getJsonPayload();
        
        if payload is json {
            string name = (check payload.name).toString();
            string nic = (check payload.nic).toString();
            string email = (check payload.email).toString();
            string password = (check payload.password).toString();

            // NIC validation
            if nic.length() != 10 && nic.length() != 12 {
                io:print("hellow world");
                http:Response badResponse = new;
                badResponse.statusCode = http:STATUS_BAD_REQUEST;
                badResponse.setJsonPayload({ "status": "fail", "message": "NIC not verified" });
                return badResponse;
            }

            // DB insert
            var result = mysqlClient->execute(
                `INSERT INTO user (name, nic, email, password) VALUES (${name}, ${nic}, ${email}, ${password})`
            );

            if result is error {
                io:print(result.message());
                http:Response dbErrorRes = new;
                dbErrorRes.statusCode = http:STATUS_BAD_REQUEST;
                dbErrorRes.setJsonPayload({ "status": "fail", "message": "Database error", "error": result.message() });
                return dbErrorRes;
            }
            io:print("hellow world2");
            http:Response successRes = new;
            successRes.statusCode = http:STATUS_CREATED;
            successRes.setJsonPayload({ "status": "success", "message": "Signup successful", "user": name });
            return successRes;

        } else {
            io:print("hellow world3");
            http:Response badPayloadRes = new;
            badPayloadRes.statusCode = http:STATUS_BAD_REQUEST;
            badPayloadRes.setJsonPayload({ "status": "fail", "message": "Invalid JSON payload" });
            return badPayloadRes;
        }
    }


}

@http:ServiceConfig {
    cors: {
        allowHeaders: ["content-type"],
        allowMethods: ["GET","POST"],
        allowOrigins: ["*"]
    }
}
service /feedback on httpDefaultListener {
    resource function get userfeedback(http:Caller caller, http:Request req) returns error? {
        string? userIdStr = req.getQueryParamValue("userId");
        if userIdStr is () {
            check caller->respond({ "status": "fail", "message": "Missing userId" });
            return;
        }
        int userId = check int:fromString(userIdStr);
        // Fetch feedback + response
        stream<record {|anydata...;|}, sql:Error?> resultStream = mysqlClient->query(`
            SELECT 
                f.feedbackId,
                f.title,
                f.message AS feedbackMessage,
                f.feedbackType,
                f.timestamp AS feedbackTime,
                f.visibility,
                r.message AS responseMessage,
                r.responseTime,
                r.adminId
            FROM feedback f
            LEFT JOIN Response r ON f.feedbackId = r.feedbackId
            WHERE f.userId = ${userId};
        `);

        json[] feedbackArray = [];
        error? e = resultStream.forEach(function(record {| anydata...; |} row) {
            // Decide status based on response
            string status = row["responseMessage"] != () ? "Reviewed" : "Pending";

            json feedback = {
                id: <int>row["feedbackId"],
                title: <string>row["title"],
                body: <string>row["feedbackMessage"],
                feedbacktype: <string>row["feedbackType"],
                status: status,
                response: row["responseMessage"] != () ? <string>row["responseMessage"] : null
            };
            feedbackArray.push(feedback);
        });

        if e is error {
            json res = { "status": "fail", "message": "Error fetching feedback" };
            check caller->respond(res);
        } else {
            json res = { "status": "success", "feedbacks": feedbackArray };
            check caller->respond(res);
        }
    }

    resource function get allfeedback(http:Caller caller, http:Request req) returns error? {
        // Fetch feedback + response
        stream<record {|anydata...;|}, sql:Error?> resultStream = mysqlClient->query(`
            SELECT 
                f.feedbackId,
                f.title,
                f.message AS feedbackMessage,
                f.feedbackType,
                f.timestamp AS feedbackTime,
                f.visibility,
                r.message AS responseMessage,
                r.responseTime,
                r.adminId
            FROM feedback f
            LEFT JOIN Response r ON f.feedbackId = r.feedbackId;
        `);

        json[] feedbackArray = [];
        error? e = resultStream.forEach(function(record {| anydata...; |} row) {
            // Decide status based on response
            string status = row["responseMessage"] != () ? "Reviewed" : "Pending";

            json feedback = {
                id: <int>row["feedbackId"],
                title: <string>row["title"],
                body: <string>row["feedbackMessage"],
                feedbacktype: <string>row["feedbackType"],
                status: status,
                response: row["responseMessage"] != () ? <string>row["responseMessage"] : null
            };
            feedbackArray.push(feedback);
        });

        if e is error {
            json res = { "status": "fail", "message": "Error fetching feedback" };
            check caller->respond(res);
        } else {
            json res = { "status": "success", "feedbacks": feedbackArray };
            check caller->respond(res);
        }
    }


    resource function post addfeedback(http:Caller caller, http:Request req) returns error? {
        io:print("start");
        json|error payload = req.getJsonPayload();
        if payload is json {
            int userId = <int>(check payload.userId);
            string title = <string>(check payload.title);
            string message = <string>(check payload.message);
            string feedbackType = <string>(check payload.feedbackType);
            boolean visibility = payload.visibility is boolean ? (check payload.visibility) : true;

            // Insert into Feedback table
            var result = mysqlClient->execute(`INSERT INTO feedback(userId, title, message, feedbackType, visibility)
                                      VALUES(${userId}, ${title}, ${message}, ${feedbackType}, ${visibility})`);
            if result is error {
                io:print(result.message());
                json res = { "status": "fail", "message": "Insert failed" };
                check caller->respond(res);
            } else {
                json res = { "status": "success"};
                check caller->respond(res);   
            }
        } else {
            json res = { "status": "fail", "message": "Invalid payload" };
            check caller->respond(res);
        }
    }

    resource function post addResponse(http:Caller caller, http:Request req) returns error? {
        json|error payload = req.getJsonPayload();
        if payload is json {
            int feedbackId = <int>(check payload.feedbackId);
            int adminId = <int>(check payload.adminId);
            string message = <string>(check payload.message);

            var result = mysqlClient->execute(`INSERT INTO Response(feedbackId, adminId, message)
                                      VALUES(${feedbackId}, ${adminId}, ${message})`);
            if result is error {
                json res = { "status": "fail", "message": "Insert failed" };
                check caller->respond(res);
            } else {
                json res = { "status": "success"};
                check caller->respond(res);
            }
        } else {
            json res = { "status": "fail", "message": "Invalid payload" };
            check caller->respond(res);
        }
    }
}

@http:ServiceConfig {
    cors: {
        allowHeaders: ["content-type"],
        allowMethods: ["GET","POST"],
        allowOrigins: ["*"]
    }
}
service /api/admin/auth on httpDefaultListener {
    // Add Admin
    resource function post addAdmin(http:Caller caller, http:Request req) returns error? {
        json|error payload = req.getJsonPayload();
        if payload is json {
            string name = <string>(check  payload.name);
            string email = <string>(check payload.email);
            string password = <string>(check payload.password);

            var result = mysqlClient->execute(`
                INSERT INTO Admins(name, email, password)
                VALUES(${name}, ${email}, ${password})
            `);

            if result is error {
                json res = { "status": "fail", "message": "Insert failed" };
                check caller->respond(res);
            } else {
                json res = { "status": "success"};
                check caller->respond(res);
            }
        } else {
            json res = { "status": "fail", "message": "Invalid payload" };
            check caller->respond(res);
        }
    }

    // Admin Login
    resource function post login(http:Caller caller, http:Request req) returns error? {
        json|error loginPayload = req.getJsonPayload();

        if loginPayload is json {
            string email = (check loginPayload.email).toString();
            string password = (check loginPayload.password).toString();

            // ✅ queryRow to get single admin
            record {| int adminId; string email; string name; |}? admin =
                check mysqlClient->queryRow(`SELECT adminId, email, name 
                                          FROM Admins 
                                          WHERE email=${email} AND password=${password}`);

            if admin is record {| int adminId; string email; string name; |} {
                json res = {
                    status: "success",
                    message: "Login successful",
                    data: {
                        adminId: admin.adminId,
                        email: admin.email,
                        name: admin.name,
                        userType:"admin"
                    }
                };
                check caller->respond(res);
            } else {
                io:print("Login failed: invalid email or password");
                json res = { "status": "fail", "message": "Invalid email or password" };
                check caller->respond(res);
            }
        } else {
            io:print("Invalid request body");
            json res = { "status": "error", "message": "Invalid request body" };
            check caller->respond(res);
        }
    }

    resource function get getAllAdmins(http:Caller caller, http:Request req) returns error? {
        // Query the database
        stream<record {|anydata...;|}, sql:Error?> resultStream = 
            mysqlClient->query(`SELECT adminId, name, email FROM Admins`);

        json[] adminsArray = [];

        // Iterate the stream
        error? e = resultStream.forEach(function(record {| anydata...; |} row) {
            json admin = {
                adminId: <int>row["adminId"],
                name: <string>row["name"],
                email: <string>row["email"]
            };
            adminsArray.push(admin);
        });

        if e is error {
            json res = { "status": "fail", "message": "Error fetching admins" };
            check caller->respond(res);
        } else {
            json res = { "status": "success", "admins": adminsArray };
            check caller->respond(res);
        }
    }


}
