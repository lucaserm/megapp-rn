import React, { useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
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
  const [search, setSearch] = useState("");

  const selectedOption = useMemo(
    () => options.find((item) => item.id === selectedValue),
    [options, selectedValue]
  );

  const filteredOptions = useMemo(() => {
    if (!search) return options;
    return options.filter((item) =>
      item.value.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search]);

  const handleSelect = (value: string) => {
    onValueChange(value);
    setOpen(false);
    setSearch(""); 
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setOpen(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>
          {selectedOption?.value || placeholder}
        </Text>
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setOpen(false)}
          activeOpacity={1}
        >
          <View style={styles.modal}>
            <TextInput
              placeholder="Buscar..."
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
            />

            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item.id}
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={
                <Text style={styles.emptyText}>Nenhum resultado</Text>
              }
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
    maxHeight: "60%",
    padding: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    marginVertical: 10,
  },
});
