import ballerina/time;
import ballerina/io;
public function main() returns error? {
    time:Utc utc1 = time:utcNow();
    io:print(`Civil record: ${utc1.toString()}`);
}