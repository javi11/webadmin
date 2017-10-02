/*
 * Copyright (c) 2017 AXA Group Solutions.
 *
 * Licensed under the AXA Group Solutions License (the "License")
 * you may not use this file except in compliance with the License.
 * A copy of the License can be found in the LICENSE.TXT file distributed
 * together with this file.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* global navigator */

import React from 'react';
import {
  ReferenceArrayField,
  TextField,
  ChipField,
  SingleFieldList,
  DateField,
  Show,
  TabbedShowLayout,
  Tab,
  FunctionField,
  translate as aorTranslate
} from 'admin-on-rest';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { red50, green50 } from 'material-ui/styles/colors';
import Chip from 'material-ui/Chip';
import RawJsonField from '../custom-fields/raw-json-field';
import EmbeddedArrayField from '../custom-fields/embedded-array-field';
import PopupField from '../custom-fields/popup-field';

const statusBgColor = status => {
  let color = '';
  if (status === 'error') {
    color = red50;
  } else if (status === 'sent') {
    color = green50;
  }

  return color;
};

function getLang() {
  return navigator.languages !== undefined ? navigator.languages[0] : navigator.language;
}

const NotificationShow = props => {
  const { translate, id, data } = props;
  const title = translate('axa.notification.detail', {
    id,
    data
  });
  return (
    <Show {...props} title={title}>
      <TabbedShowLayout>
        <Tab label="axa.notification.tabs.info">
          <TextField source="id" label="axa.fields.id" />
          <ReferenceArrayField
            label="axa.fields.components"
            reference="components"
            source="components"
          >
            <SingleFieldList>
              <ChipField source="name" />
            </SingleFieldList>
          </ReferenceArrayField>
          <DateField
            label="axa.fields.createdAt"
            source="createdAt"
            showTime
            locales={getLang()}
            options={{
              weekday: 'long',
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
              hour12: false
            }}
          />
          <TextField label="axa.fields.deliveryStatus" source="status" />
          <TextField label="axa.fields.userId" source="userId" />
        </Tab>
        <Tab label="axa.notification.tabs.payload">
          <RawJsonField label="axa.fields.payload" source="payload" collapsed={false} />
        </Tab>
        <Tab label="axa.notification.tabs.details">
          <EmbeddedArrayField label="axa.fields.pushNotifications" source="pushNotifications">
            <TextField source="installationId" label="axa.fields.installationId" />
            <DateField
              label="axa.fields.createdAt"
              source="createdAt"
              showTime
              locales={getLang()}
              options={{
                localeMatcher: 'best fit',
                weekday: 'long',
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false
              }}
            />
            <FunctionField
              label="axa.fields.status"
              render={record => (
                <Chip backgroundColor={statusBgColor(record.status)}>
                  {record.status.toUpperCase()}
                </Chip>
              )}
            />
            <PopupField source="response" label="axa.fields.response">
              <RawJsonField source="response" collapsed={false} />
            </PopupField>
          </EmbeddedArrayField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};

function mapStateToProps(state, props) {
  return {
    id: decodeURIComponent(props.match.params.id),
    data: state.admin.resources[props.resource]
      ? state.admin.resources[props.resource].data[decodeURIComponent(props.match.params.id)]
      : null
  };
}

const enhance = compose(connect(mapStateToProps), aorTranslate);

export default enhance(NotificationShow);
