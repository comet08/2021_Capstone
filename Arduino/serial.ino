void setup() {
  Serial.begin(9600);
}

float testing = 230.2;
String startwith = "01:01:01";
String endwith = "01:11:11";
String id = "test";
String fid = "fid";

void loop() {
  delay(5000);
    Serial.println("Exercise");
    delay(50);
  Serial.println("startwith-"+startwith);
   delay(100);
    Serial.println("endwith-"+endwith);
   delay(100);
  Serial.println("energy-"+String(testing));
   delay(100);
  Serial.println("id-"+id);
   delay(50);
  Serial.println("fid-"+fid);
  delay(50);
   Serial.println("End");
  delay(1000);
}
