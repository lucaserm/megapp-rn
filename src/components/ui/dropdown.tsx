import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface OptionsProps {
  id: string;
  value: string;
}

interface DropdownProps {
  options: OptionsProps[];
  selectedValue?: string | null;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export function Dropdown({
  options,
  selectedValue = null,
  onValueChange,
  placeholder = "Selecione...",
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    onValueChange(value);
    setOpen(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setOpen(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>
          {options.filter((item) => item.id === selectedValue)[0]?.value ||
            placeholder}
        </Text>
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setOpen(false)}
          activeOpacity={1}
        >
          <View style={styles.modal}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleSelect(item.id)}
                >
                  <Text style={styles.itemText}>{item.value}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  buttonText: {
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: "#00000066",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 8,
    maxHeight: "50%",
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 16,
  },
});
