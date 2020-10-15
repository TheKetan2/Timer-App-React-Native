// import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { Picker } from "@react-native-community/picker";

const screen = Dimensions.get("screen");

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [start, setStartToggle] = useState(true);
  const [time, setTime] = useState({ minute: 0, second: 0 });
  const funRef = useRef(null);

  const createArr = (num) => {
    let arr = [];
    let i = 0;
    while (i <= num) {
      arr.push(i.toString());
      i++;
    }
    return arr;
  };

  const MIN = createArr(10);
  const SEC = createArr(60);

  const getRemaining = (sec) => {
    const minute = Math.floor(sec / 60);
    const second = sec - minute * 60;
    return formatTime(minute) + ":" + formatTime(second);
  };

  const formatTime = (time) => {
    return ("0" + time).slice(-2);
  };
  let sec = seconds;
  useEffect(() => {
    // let timer = null;

    //----------------///

    if (!start) {
      sec = seconds;
      funRef.current = setInterval(() => {
        console.log("Seconds remaining:", sec);
        if (sec <= 0) {
          clearInterval(funRef.current);
          setTimeout(() => setStartToggle(true), 2000);
        }
        setSeconds(sec--);
      }, 1000);
    } else {
      clearInterval(funRef.current);
    }
  }, [start]);

  const startTimer = () => {
    console.log("Seconds: ", seconds);

    setSeconds(sec);
    setStartToggle(false);
  };

  const stopTimer = () => {
    setSeconds(sec);
    setStartToggle(true);
  };

  const setPickerValue = () => {
    let totalSeconds = time.minute * 60 + time.second;
    setSeconds(totalSeconds);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {seconds === 0 && start ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={time.minute.toString()}
              value={time.minute}
              style={styles.picker}
              itemStyle={styles.pickerItemText}
              onValueChange={(itemValue, itemIndex) =>
                setTime({ ...time, ...{ minute: parseInt(itemValue) } })
              }
              mode="dropdown"
            >
              {MIN.map((num) => (
                <Picker.Item
                  key={Math.floor(Math.random() * 1000000)}
                  label={num}
                  value={num}
                />
              ))}
            </Picker>
            <Text
              style={{
                color: "#89aaff",
                fontWeight: "bold",
                fontSize: 18,
                letterSpacing: 1.5,
              }}
            >
              Minutes
            </Text>
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={time.second.toString()}
              style={styles.picker}
              itemStyle={{
                color: "#89aaff",
                fontWeight: "bold",
                fontSize: 18,
                letterSpacing: 1.5,
              }}
              onValueChange={(itemValue, itemIndex) =>
                setTime({ ...time, ...{ second: parseInt(itemValue) } })
              }
              mode="dropdown"
            >
              {SEC.map((num) => (
                <Picker.Item
                  key={Math.floor(Math.random() * 1000000)}
                  label={num}
                  value={num}
                />
              ))}
            </Picker>
            <Text style={styles.pickerItemText}>Seconds</Text>
          </View>
          <TouchableOpacity
            onPress={setPickerValue}
            style={[styles.pickerContainer, { borderColor: "green" }]}
          >
            <Text
              style={[styles.pickerItemText, { color: "green" }]}
            >{`\>`}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text
          style={
            seconds ? styles.timerText : [styles.timerText, { color: "red" }]
          }
        >
          {getRemaining(seconds)}
        </Text>
      )}
      {start ? (
        <TouchableOpacity onPress={startTimer} style={styles.button}>
          <Text style={styles.buttonText}>START</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={stopTimer}
          style={[styles.button, { borderColor: "orange" }]}
        >
          <Text style={styles.buttonText}>STOP</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07121B",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderWidth: 10,
    borderColor: "#89aaff",
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 40,
    color: "#89aaff",
    fontWeight: "bold",
  },

  picker: {
    height: 50,
    width: 80,
    color: "white",
    backgroundColor: "#07121B",
    borderWidth: 10,
    borderColor: "#89aaff",
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "orange",
    borderWidth: 2,
    height: 100,
    marginLeft: 10,
    padding: 10,
    paddingVertical: 40,
    borderRadius: 30,
  },

  pickerItemText: {
    color: "#89aaff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1.5,
  },
  timerText: {
    fontSize: 90,
    color: "#89aaff",
    fontWeight: "bold",
    marginBottom: 20,
    height: 100,
  },
});
