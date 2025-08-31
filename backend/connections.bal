import ballerinax/mysql;
import ballerinax/mysql.driver as _;

final mysql:Client mysqlClient = check new ("localhost", "root", database = "complaintSL_db", port = 3306);
const string JWT_SECRET = "mySuperSecretKey";