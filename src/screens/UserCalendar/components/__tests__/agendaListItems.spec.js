import React from 'react';
import Renderer from 'react-test-renderer';
import AgendaListItems from '../AgendaListItems';
import data from '../../../../../__tests__/mock/calendar.json';

const props = {
  section: {
    data: [Object.values(data.events)],
    title: '10:00'
  }
};

const props2 = {
  section: {
    data: [Object.values(data.events)],
    title: '12:00'
  }
};
const wrapper = Renderer.create(<AgendaListItems {...props} />);
const wrapper1 = Renderer.create(<AgendaListItems {...props2} />);

describe('Agenda List Items', () => {
  it('should match snapshot when title is 10:00', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should match snapshot when title is 12:00', () => {
    expect(wrapper1).toMatchSnapshot();
  });
});
