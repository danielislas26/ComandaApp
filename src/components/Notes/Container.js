import React, { useState, useEffect } from "react";
import { Popup } from "./Popup";
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { getItems, deleteItem } from "../../api";

const rows = 4;
const cols = 2;
const marginHorizontal = 4;
const marginVertical = 4;
const width =
  Dimensions.get("window").width / cols - marginHorizontal * (cols + 1);
const height =
  Dimensions.get("window").height / rows - marginVertical * (rows + 1);

const Num = ({ datos, onIdSelect, selectedId, datatofetch, fetchItems }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [popupData, setPopupData] = useState("");
  const [idData, setIdData] = useState("");
  const [cuentaData, setCuentas] = useState("");
  const [wholId, setWholeId] = useState("");
  const handleButtonClick = (data) => {
    setPopupData(data);
    setIdData(data._id.slice(-2));
    setCuentas(data.Cuentas);
    setPopupVisibility(true);
    setWholeId(data._id);
  };

  const handleClosePopup = () => {
    setPopupVisibility(false);
  };

  const url = "http://192.168.1.192:8686/cuentas";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await getItems();
        setData(items);
        setError(null);
      } catch (error) {
        setError(
          "There was a problem fetching the items. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [pressedButton, setPressedButton] = useState(null);
  const handlePress = (buttonId) => {
    setPressedButton(buttonId);
  };

  const [lastTappedId, setLastTappedId] = useState(null);

  const handleButtonPress = (buttonId) => {
    if (lastTappedId !== buttonId) {
      handlePress(buttonId._id);
      onIdSelect(buttonId._id);
    } else {
      handleButtonClick(buttonId);
    }
    setLastTappedId(buttonId);
  };

  const handleOutsidePress = () => {
    setLastTappedId(null);
    setPressedButton(null);
    onIdSelect(null);
    Keyboard.dismiss();
  };

  const handleLongPress = (id) => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete this count?",
      [
        {
          text: "No",
          onPress: () => console.log("No Pressed"),
          style: "cancel",
        },
        { text: "Yes", onPress: () => handleDelete(id) },
      ],
      { cancelable: false }
    );
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      fetchItems(); // Refresh the items after deletion
      console.log("Item deleted successfully");
    } catch (error) {
      console.error(`Error deleting item:`, error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.sectionContainer}>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>{error}</Text>
        ) : datatofetch.length === 0 ? (
          <Text>There's no cuentas saved yet.</Text>
        ) : (
          datatofetch.map((post) => (
            <TouchableOpacity
              key={post._id}
              style={[
                styles.button,
                pressedButton === post._id && styles.buttonPressed,
              ]}
              onPress={() => handleButtonPress(post)}
              onLongPress={() => handleLongPress(post._id)}
              delayLongPress={800}
            >
              <Text style={styles.text}>#{post._id.slice(-2)}</Text>
            </TouchableOpacity>
          ))
        )}
        <Popup
          isVisible={isPopupVisible}
          onClose={handleClosePopup}
          popupData={popupData}
          id={idData}
          cuenta={cuentaData}
          wholId={wholId}
          fetchItems={fetchItems}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const Notas = ({ datos, onIdSelect, selectedId, datatofetch, fetchItems }) => {
  return (
    <View style={styles.containerNotas}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Num
          datos={datos}
          onIdSelect={onIdSelect}
          selectedId={selectedId}
          datatofetch={datatofetch}
          fetchItems={fetchItems}
        ></Num>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerNotas: {
    height: "70%",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
    height: "75%",
  },
  sectionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: marginHorizontal,
    marginRight: marginHorizontal,
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gold",
    borderRadius: 5,
  },
  buttonPressed: {
    backgroundColor: "#e2b206",
  },
  text: {
    textAlign: "center",
    textAlignVertical: "center",
    height: "100%",
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
});

export { Notas, Num };
