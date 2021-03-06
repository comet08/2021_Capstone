#include <Adafruit_BusIO_Register.h>
#include <Adafruit_I2CDevice.h>
#include <Adafruit_I2CRegister.h>
#include <Adafruit_SPIDevice.h>
#include <Adafruit_Sensor.h>
#include <Wire.h>
#include <Adafruit_INA219.h>
#include <LiquidCrystal_I2C.h>
#include <SoftwareSerial.h>

SoftwareSerial bluetooth(13, 12);
Adafruit_INA219 ina219;
LiquidCrystal_I2C lcd(0x27, 16, 2);
float whole_mA = 0;
float shuntvoltage = 0;
float busvoltage = 0;
float current_mA = 0;
float loadvoltage = 0;
float power_mW = 0;
char input;
char **ptr;
int flag = 0;
int flagend = 0;
char c[100];

int scount = 0;

float testing = 230.2;
String startwith = "";
String endwith = "";
String id = "";
String fid = "fid";

void setup() {
  Serial.begin(9600);
  uint32_t crruntFrequency;
  bluetooth.begin(9600);
  ina219.begin();
  lcd.init();
  lcd.backlight();
}

void loop() {

  if (bluetooth.available()) 
    input = bluetooth.read();
 

  if (input == 's' && !flag){
      flag=1;
      shuntvoltage = 0;
      busvoltage = 0;
      current_mA = 0;
      loadvoltage = 0;
      whole_mA = 0;
      power_mW = 0;
  }
  
      if (flag == 1) {
        current_mA = ina219.getCurrent_mA();
        if (current_mA > 0)
          whole_mA += current_mA;
          lcd.setCursor(0,0);
          lcd.print("Current:");
          lcd.print(current_mA);
          lcd.setCursor(0,1);
          lcd.print("Whole:");
          lcd.print(whole_mA);
        
        delay(500);
      }
    
     if(flag && input == 'e'){
        lcd.clear();
        flag = 0;
        flagend = 1;
     }

     if (flag == 0 && flagend){
      while (input != '/'){
        input = bluetooth.read();
        //무시
      }
      input = bluetooth.read();
      while (input != '/'){
        id += input;
        input = bluetooth.read();
      }
      input = bluetooth.read();
      while (input != '/'){
        startwith += input;
        input = bluetooth.read();
      }
      input = bluetooth.read();
      while (input != '/'){
        endwith += input;
        input = bluetooth.read();
      }
     Serial.println("Exercise");
     Serial.println(id+'/'+startwith+'/'+endwith+'/'+fid+'/'+whole_mA);
     Serial.println("End");
     id = "";
     startwith = "";
     endwith = "";
     flagend = 0;
     
    }

    
  }
