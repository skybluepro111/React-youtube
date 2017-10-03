import React from 'react';
import ReactDOM from 'react-dom';

import {
  Grid, Row, Col, Icon, Button,
  TimelineView,
  TimelineItem,
  TimelineBody,
  TimelineHeader,
  TimelineAvatar,
  TimelineTitle,
} from '@sketchpixy/rubix';

function dateFromObjectId(objectId) {
  return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
}

export default class StatisticsComponent extends React.Component {

  render() {
    const im_date = new Date(this.props.user.im.date);
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12}>
              <div className="sidebar-header text-center">PRETS</div>
              <div style={{ marginLeft: -25, marginRight: -25, marginTop: 12.5, marginBottom: 12.5, textAlign: 'center', color: 'white', fontSize: '30px' }}> {this.props.user.im.prets.length}/3 </div>
              <hr style={{ borderColor: 'rgba(255,255,255,0.1)', borderWidth: 2, marginTop: 12.5, marginBottom: 25, width: 200 }} />
              <div className="sidebar-header text-center">MINUTOS</div>
              <div style={{ marginLeft: -25, marginRight: -25, marginTop: 12.5, marginBottom: 12.5, textAlign: 'center', color: 'white', fontSize: '30px' }}> {this.props.user.im.time}/30 </div>
              <br />
            </Col>
          </Row>

          <Row>
            <Col xs={12} collapseLeft collapseRight>
              <TimelineView className="border-black50 tl-blue">
                <TimelineItem>
                  <TimelineBody>
                    <ul>
                      <li>
                        <div>
                          <div className="fg-lightgray"><small><strong>{`${im_date.getUTCDate()}/${im_date.getMonth()}/${im_date.getFullYear()}`}</strong></small></div>
                          <div><small>Te uniste a Interpretame!</small></div>
                        </div>
                      </li>
                    </ul>
                  </TimelineBody>
                </TimelineItem>
              </TimelineView>
              {!this.props.user.tour ? <TimelineView className="border-black50 tl-green">
                <TimelineItem>
                  <TimelineBody>
                    <ul>
                      <li>
                        <div>
                          <div><small>Viste el tour!</small></div>
                        </div>
                      </li>
                    </ul>
                  </TimelineBody>
                </TimelineItem>
              </TimelineView> : null}

              {this.props.user.im.prets.length ? this.props.user.im.prets.map((pret_id, index) => {
                const pret_date = dateFromObjectId(pret_id);
                return (<TimelineView className="border-black50 tl-green" key={index}>
                  <TimelineItem>
                    <TimelineBody>
                      <ul>
                        <li>
                          <div>
                            <div className="fg-lightgray"><small><strong>{`${pret_date.getUTCDate()}/${pret_date.getMonth()}/${pret_date.getFullYear()}`}</strong></small></div>
                            <div><small>Hiciste un Pret</small></div>
                          </div>
                        </li>
                      </ul>
                    </TimelineBody>
                  </TimelineItem>
                </TimelineView>);
              }) : null}

            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
