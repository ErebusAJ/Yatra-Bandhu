import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import TravelCard from "./components/connect-cards";
import { SafeAreaView } from "react-native-safe-area-context";
import Taskbar from "./components/taskbar";

const Connect = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>🌍 Connect</Text>
        <Text style={styles.subheading}>
          Meet like-minded travelers and explore together!
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TravelCard
          image="https://i0.wp.com/lahimalaya.com/wp-content/uploads/2019/08/Ladakh-trip.jpg?w=960&ssl=1"
          title="LADAKH"
          profileImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGs1Q_VAfNSuIECx_R2za8uPIClzncMiDN4Q&s"
          name="Jessie"
          description="Starting in Leh with visits to Shanti Stupa, Leh Palace, and bustling markets for acclimatization. Explore Magnetic Hill, Gurudwara Pathar Sahib, and the confluence of the Indus and Zanskar rivers. Drive through the world’s highest motorable pass, Khardung La, to reach Nubra Valley, where you can visit Diskit Monastery and enjoy a camel ride at Hunder Sand Dunes. Journey to the breathtaking Pangong Lake via Shyok, witnessing its ever-changing colors. Return to Leh via Chang La Pass, stopping at Hemis and Thiksey Monasteries, and depart with unforgettable memories of Ladakh’s stunning landscapes."
          tripDates="March 25,2025-March 30,2025"
          groupSize="2/6"
          profiles={[
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww",
            "https://t3.ftcdn.net/jpg/06/78/09/78/360_F_678097876_9kJnFlRYGAeibsVxspqtCL9UR8giLAvF.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyp3RY4pztkxgYIySTwC9uC1uFJaC1b9b6xw&s",
          ]}
        />
        <TravelCard
          image="https://a.travel-assets.com/findyours-php/viewfinder/images/res70/64000/64898-Argentina.jpg"
          title="ARGENTINA"
          profileImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
          name="Andrew"
          description="Argentina, the second-largest country in South America, is known for its rich culture, diverse landscapes, and passionate people. From the vibrant streets of Buenos Aires to the breathtaking Andes Mountains and the vast Pampas grasslands, Argentina offers stunning natural beauty. It is famous for tango music, delicious cuisine—especially steak and empanadas—and world-class wine from Mendoza. The country boasts incredible destinations like Iguazu Falls, Patagonia, and Tierra del Fuego. Football is a national obsession, with legends like Diego Maradona and Lionel Messi. Argentina’s history blends indigenous heritage with European influences, creating a unique and dynamic cultural identity."
          tripDates="April 05,2025-April 12,2025"
          groupSize="2/3"
          profiles={[
            "https://img.freepik.com/free-photo/portrait-african-american-guy-wearing-grey-hoodie-smiling_482257-111149.jpg",
          ]}
        />
        <TravelCard
          image="https://tripgala.com/wp-content/uploads/2023/08/mt-fuji-1024x597.jpg"
          title="JAPAN"
          profileImage="https://i.pinimg.com/236x/04/bd/b7/04bdb72cc2ef2d0a2cdda2114339f1b4.jpg"
          name="Joseph"
          description="Japan, an island nation in East Asia, is a fascinating blend of ancient traditions and modern innovation. Known for its rich cultural heritage, it boasts stunning temples, cherry blossoms, and traditional tea ceremonies. Tokyo, its capital, is a global hub of technology and fashion, while Kyoto preserves Japan’s historic charm. The country is famous for sushi, ramen, and meticulous craftsmanship. Japan's natural beauty includes Mount Fuji, hot springs, and serene gardens. It is also home to anime, sumo wrestling, and bullet trains. With a deep respect for harmony and discipline, Japan offers a unique and captivating experience."
          tripDates="March 06,2025-March 18,2025"
          groupSize="4/5"
          profiles={[
            "https://media.istockphoto.com/id/2148975617/photo/woman-jumping-high-after-successful-job-interview.jpg?s=612x612&w=0&k=20&c=puWecKm9APpx7QYJmjHEySQVZM38wRDEQQvSZaCeL30=",
            "https://e1.pxfuel.com/desktop-wallpaper/928/355/desktop-wallpaper-sm-on-twitter-random-people.jpg",
            "https://images.unsplash.com/photo-1524666041070-9d87656c25bb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFsZXxlbnwwfHwwfHx8MA%3D%3D",
          ]}
        />
        <TravelCard
          image="https://tripgala.com/wp-content/uploads/2023/08/lake-geneva-1024x597.jpg"
          title="SWITZERLAND"
          profileImage="https://preview.redd.it/39sunkhvpw341.jpg?width=1080&crop=smart&auto=webp&s=a242c79f04cdd51b412da50c51b9378f95a549fe"
          name="Kelly"
          description="Switzerland, nestled in the heart of Europe, is renowned for its breathtaking Alps, picturesque lakes, and charming villages. Known for its high quality of life, it offers world-class skiing, hiking, and scenic train journeys like the Glacier Express. The country is famous for Swiss chocolate, cheese, and precision watchmaking. Cities like Zurich and Geneva blend modernity with rich cultural heritage, while Lucerne and Interlaken showcase stunning natural beauty. Switzerland is also home to global organizations and has a strong tradition of neutrality. With its clean environment, efficient transport, and warm hospitality, it remains a dream destination for travelers."
          tripDates="May 25,2025-June 07,2025"
          groupSize="1/4"
          profiles={[
            "https://t3.ftcdn.net/jpg/06/78/09/78/360_F_678097871_G7OpoHQmiZTj4bHB7YW2HoH1syWfCbB9.jpg",
            "https://wallpapers.com/images/hd/random-person-in-sexy-blue-dress-cdh7v7m1adym4umd.jpg",
          ]}
        />
      </ScrollView>

      {/* Fixed Taskbar at the Bottom */}
      <View style={styles.taskbarContainer}>
        <Taskbar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    alignItems: "center",
    paddingVertical: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
    textAlign: "center",
  },
  scrollContainer: {
    paddingBottom: 80, // Space for the Taskbar
  },
  taskbarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white", // Match your theme
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    elevation: 5, // Shadow for better visibility
  },
});

export default Connect;
