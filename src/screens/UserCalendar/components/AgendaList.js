import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { AgendaList as AgendaListComponent } from 'react-native-calendars';
import AgendaItemsList from './AgendaListItems';
import { calendarStyles as styles } from './styles';
import TimeIndictor from './TimeIndictor';
import { formatDate, getCurrentTime } from '../../../utils/helpers';
import {
  responsiveHeight,
  currentTimeRatio
} from '../../../utils/responsiveDimensions';

const CURRENT_TIME = getCurrentTime();
const HEIGHT_RATIO = responsiveHeight(currentTimeRatio());
const CURRENT_DATE = formatDate(new Date());
class AgendaList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rendered: false,
      opacity: 0
    };
    this.timeOut = 0;
  }

  toCurrentTime = (_, height) => {
    const { currentDate } = this.props;

    if (currentDate !== CURRENT_DATE) {
      return this.componentReady();
    }
    if (HEIGHT_RATIO < height) {
      this.componentReady();
    }
    return this._scrollView.scrollTo({
      x: 0,
      y: (HEIGHT_RATIO / 24) * CURRENT_TIME,
      animated: true,
      duration: 100
    });
  };

  componentReady = () => {
    this.setState({
      rendered: true,
      opacity: 1
    });
  };

  renderAgenda = ({ currentEvents, extraData }) => (
    <AgendaListComponent
      title=""
      sections={currentEvents}
      extraData={extraData}
      renderItem={({ section }) => <AgendaItemsList section={section} />}
      sectionStyle={styles.section}
      sectionScroll={false}
    />
  );

  render() {
    const {
      currentEvents, extraData, currentDate, isLoading
    } = this.props;
    const { rendered, opacity } = this.state;
    return (
      <ScrollView
        removeClippedSubViews
        overScrollMode="auto"
        ref={(ref) => {
          this._scrollView = ref;
        }}
        onContentSizeChange={this.toCurrentTime}
        opacity={opacity}
        testId="scroll-view"
      >
        {CURRENT_DATE === currentDate && !isLoading && rendered && <TimeIndictor />}
        {this.renderAgenda({ currentEvents, extraData })}
      </ScrollView>
    );
  }
}

AgendaList.propTypes = {
  currentEvents: PropTypes.instanceOf(Array).isRequired,
  extraData: PropTypes.shape({}),
  currentDate: PropTypes.string,
  isLoading: PropTypes.bool.isRequired
};

AgendaList.defaultProps = {
  extraData: {},
  currentDate: ''
};
export default AgendaList;
