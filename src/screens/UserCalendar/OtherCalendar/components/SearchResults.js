import React from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';
import { addCalendarStyles } from '../../components/agendaStyles';

const SearchResults = ({ data, pinUser }) => (
  <View style={addCalendarStyles.resultContainer}>
    <FlatList
      data={data}
      keyExtractor={(item, index) => `${item.id}+ ${index}`}
      renderItem={({ item }) => (
        <ListItem
          leftAvatar={{
            rounded: true,
            source: {
              uri: item.picture || ' '
            }
          }}
          title={item.email}
          titleStyle={addCalendarStyles.title}
          key={item.id}
          containerStyle={addCalendarStyles.listItem}
          onPress={() => pinUser(item)}
          testId="single-user"
        />
      )}
    />
  </View>
);

SearchResults.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  pinUser: PropTypes.func.isRequired
};
export default SearchResults;
