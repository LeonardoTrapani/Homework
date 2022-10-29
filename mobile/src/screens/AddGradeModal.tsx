import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { AddGradeStackScreenProps } from "../../types";
import KeyboardWrapper from "../components/KeyboardWrapper";
import MyInput from "../components/MyInput";
import { RegularText } from "../components/StyledText";
import { View } from "../components/Themed";
import { activeSubjectAtom } from "../util/atoms";
import useColorScheme from "../util/useColorScheme";
import useInput from "../util/useInput";

const AddHomeworkModal = ({
  route,
  navigation,
}: AddGradeStackScreenProps<"Root">) => {
  //when I exit reset the atom
  const [activeSubjectHasError, setActiveSubjectHasError] = useState(false);
  const [activeSubject, setActiveSubject] = useAtom(activeSubjectAtom);
  const { card } = useTheme().colors;
  const { value, errorMessage, hasError, onChangeText } = useInput([
    {
      errorMessage: "only numbers accepted",
      check: (value) => typeof value === "number",
    },
  ]);

  const colorScheme = useColorScheme();
  const { errorColor } = Colors[colorScheme];

  useEffect(() => {
    if (route.params?.Subject) {
      const { name, id, color } = route.params.Subject;
      setActiveSubject({ id, name, color });
    }
  }, [route.params, setActiveSubject]);
  console.log(activeSubject);

  const chooseSubjectHandler = () => {
    navigation.push("ChooseSubject");
  };

  return (
    <KeyboardWrapper>
      <View style={{ flex: 1, padding: 20 }}>
        <MyInput
          keyboardType="numeric"
          name="Grade"
          hasError={hasError}
          errorMessage={errorMessage}
        />
        <TouchableOpacity onPress={chooseSubjectHandler} style={[styles.main]}>
          {activeSubject ? (
            <View
              style={[styles.activeSubjectContainer, { backgroundColor: card }]}
            >
              <RegularText style={styles.activeSubject}>
                {activeSubject.name}
              </RegularText>
              <View
                style={[
                  styles.coloredCircle,
                  { backgroundColor: activeSubject.color },
                ]}
              ></View>
            </View>
          ) : (
            <RegularText
              style={[
                styles.undefinedText,
                activeSubjectHasError ? { color: errorColor } : {},
              ]}
            >
              Subject
            </RegularText>
          )}
          <Ionicons name="chevron-forward" size={24} color="#aaa" />
        </TouchableOpacity>
      </View>
    </KeyboardWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    marginBottom: 20,
  },
  activeSubjectContainer: {
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  activeSubject: {
    fontSize: 17,
  },
  undefinedText: {
    fontSize: 17,
    color: "#888",
  },
  main: {
    height: 55,
    borderBottomWidth: 1,
    borderColor: "#0000001e",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 0,
    flexDirection: "row",
    fontSize: 17,
  },
  coloredCircle: {
    height: 25,
    borderWidth: 0.2,
    marginRight: 10,
    borderColor: "#000",
    aspectRatio: 1,
    borderRadius: 1000,
  },
});

export default AddHomeworkModal;
