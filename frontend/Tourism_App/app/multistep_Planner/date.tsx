import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar, DateData } from "react-native-calendars";

interface DateStepProps {
  onDateChange: (startDate: string, endDate: string) => void;
}

const DateStep: React.FC<DateStepProps> = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const handleDayPress = (day: DateData) => {
    const selectedDate = day.dateString;

    if (!startDate || (startDate && endDate)) {
      // Select new start date
      setStartDate(selectedDate);
      setEndDate(null); // Reset end date
    } else if (selectedDate > startDate) {
      // Select end date only if it's after the start date
      setEndDate(selectedDate);
      onDateChange(startDate, selectedDate);
    }
  };

  const getMarkedDates = () => {
    if (!startDate) return {};

    let marked: any = {
      [startDate]: {
        selected: true,
        color: "#ffa952",
        textColor: "white", // Ensure text stays visible
      },
    };

    if (endDate) {
      marked[endDate] = {
        selected: true,
        color: "#ffa952",
        textColor: "white", // Ensure text stays visible
      };

      let start = new Date(startDate);
      let end = new Date(endDate);
      let current = new Date(start);

      // Mark intermediate dates
      while (current < end) {
        current.setDate(current.getDate() + 1);
        const dateString = current.toISOString().split("T")[0];
        if (dateString !== endDate) {
          marked[dateString] = {
            selected: true,
            color: "rgba(39, 15, 0, 0.07)",
          }; // Light orange for range
        }
      }
    }

    return marked;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plan Your Travel Schedule</Text>
      <Text style={styles.subtitle}>
        Your journey starts with a date—map it out and make it unforgettable
        ✈️🌍
      </Text>

      <View style={styles.card}>
        <Calendar
          minDate={new Date().toISOString().split("T")[0]} // Disable past dates
          onDayPress={handleDayPress}
          markedDates={getMarkedDates()}
          markingType={"period"}
          theme={{
            selectedDayBackgroundColor: "#ffa952",
            selectedDayTextColor: "white",
            todayTextColor: "black",
            arrowColor: "#ffa952",
          }}
        />
      </View>
    </View>
  );
};

export default DateStep;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 15,
    textAlign: "center",
  },
  card: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    height: "auto",
    width: 350,
    borderWidth: 2,
    borderColor: "#ffa952", // Orange border for calendar
  },
});
