import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, Text } from 'react-native';
import { flattenDeep } from 'lodash';
import AgendaItem from './AgendaItem';
import { agendaList as styles } from './styles';

const AgendaListItems = ({ section }) => {
  const data = flattenDeep([...section.data]);
  let title;
  ({ title } = section);
  title = title === '12:00' ? '12PM' : title;
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.title}>
          <Text>{title}</Text>
        </View>
        <View style={styles.horizontalLine} />
      </View>
      <View style={styles.main}>
        <FlatList
          data={data}
          horizontal
          renderItem={({ item }) => (
            <AgendaItem item={item} itemsLength={data.length} />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          testId="list-component"
        />
      </View>
    </View>
  );
};

AgendaListItems.propTypes = {
  section: PropTypes.shape({
    data: PropTypes.array
  }).isRequired
};
export default AgendaListItems;
