import React from 'react';
import { FlatList, StyleSheet, View, ScrollView } from 'react-native';
import ModalComponent from './ModalComponent';
import { H4 } from './Texts';
import Theme from '../constants/theme';
import { TextInputBox } from './Inputs';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function (props) {
  const [items, setItems] = React.useState(props.menuItems || []);
  const [search, setSearch] = React.useState('');
  React.useEffect(() => {
    if (!search) {
      setItems(props.menuItems);
      return;
    }
    const newItems = props.menuItems.filter((item) =>
      item.value.toLowerCase().includes(search.toLowerCase())
    );
    setItems(newItems);
  }, [search, props.menuItems]);
  return (
    <ModalComponent visible={props.visible} closeModal={props.closeModal}>
      <View style={styles.modalContent}>
        <View style={styles.flatListContainer}>
          <TextInputBox
            inputlabel='Search'
            placeholder='search..'
            name='Search'
            onChangeText={(value) => setSearch(value)}
            value={search}
          />
          <FlatList
            style={styles.flatList}
            data={items}
            renderItem={(item) => (
              <TouchableOpacity
                key={item.index}
                style={styles.listItem}
                onPress={() => {
                  props.select(item.item);
                  props.closeModal();
                }}
              >
                <H4 style={styles.listText}>{item.item.value}</H4>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={styles.listItem}>
                <H4 style={styles.listText}>No banks found</H4>
              </View>
            }
          />
        </View>
      </View>
    </ModalComponent>
  );
}
const styles = StyleSheet.create({
  modalContent: {},
  flatList: {},
  flatListContainer: {
    maxHeight: 400,
    height: 400,
    width: 250,
  },
  listItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomColor: Theme.overlay,
    borderBottomWidth: 1,
  },
  listText: {
    textAlign: 'center',
  },
});
