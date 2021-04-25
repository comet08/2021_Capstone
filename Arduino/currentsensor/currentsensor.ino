#include <Adafruit_BusIO_Register.h>
#include <Adafruit_I2CDevice.h>
#include <Adafruit_I2CRegister.h>
#include <Adafruit_SPIDevice.h>
#include <Adafruit_Sensor.h>
#include <Wire.h>
#include <Adafruit_INA219.h>
#include <LiquidCrystal_I2C.h>
#include <SoftwareSerial.h>

SoftwareSerial bluetooth(3, 2);
Adafruit_INA219 ina219;
LiquidCrystal_I2C lcd(0x27, 16, 2);
float whole_mA = 0;
float shuntvoltage = 0;
float busvoltage = 0;
float current_mA = 0;
float loadvoltage = 0;
float power_mW = 0;
char input;

void setup() {
  Serial.begin(9600);
  uint32_t crruntFrequency;
  bluetooth.begin(9600);
  ina219.begin();
  lcd.init();
  lcd.backlight();
}

void loop() {
  input = bluetooth.read();
  
  if (bluetooth.available()) {
    Serial.write(bluetooth.read());
  }

  if (input == 's'){
    while(input != 'e'){
  shuntvoltage = 0;
  busvoltage = 0;
  current_mA = 0;
  loadvoltage = 0;
  power_mW = 0;

  shuntvoltage = ina219.getShuntVoltage_mV();
  busvoltage = ina219.getBusVoltage_V();
  current_mA = ina219.getCurrent_mA();
  power_mW = ina219.getPower_mW();
  loadvoltage = busvoltage + (shuntvoltage / 1000);

  Serial.print("전력 출력 시작");
  Serial.print("Bus Voltage:   "); Serial.print(busvoltage); Serial.println(" V");
  Serial.print("Shunt Voltage: "); Serial.print(shuntvoltage); Serial.println(" mV");
  Serial.print("Load Voltage:  "); Serial.print(loadvoltage); Serial.println(" V");
  Serial.print("Current:       "); Serial.print(current_mA); Serial.println(" mA");
  Serial.print("Power:         "); Serial.print(power_mW); Serial.println(" mW");
  Serial.println("전력 출력 끝");

  whole_mA += current_mA;
  lcd.setCursor(0,0);
  lcd.print("Current:");
  lcd.print(current_mA);
  lcd.setCursor(0,1);
  lcd.print("Whole:");
  lcd.print(whole_mA);
  
  delay(1000);
  lcd.clear();
  input = bluetooth.read();
  }
  }
}
