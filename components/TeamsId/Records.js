import TeamsService from "../../libs/TeamsService";
import { get } from 'lodash';
import RecordDetail from './RecordDetail';

export default class Records extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recordKeys: [],
      records: [],
      record: {},
      loading: true,
      sortedBy: '',
      sortOrder: 'desc'
    };
  }

  componentDidMount() {
    this.getToken();
    this.getAllRecords();
  }

  getToken = () => {
    let token = sessionStorage.getItem("session_token");
    console.log('token s', token);
    if (!token) {
      TeamsService.getToken()
        .then(res => {
          console.log('get token', res);
          sessionStorage.setItem('session_token', res.data.session_token) || '';
        })
        .catch(err => {
          console.error(err)
        })
    }
    return;
  }

  getAllRecords = () => {
    TeamsService.getAllRecords()
      .then(res => {
        console.log('records', res.data.records);
        let recordsObj = res.data.records;
        let keys = Object.keys(recordsObj);        
        this.setState({
          recordKeys: keys || [],
          records: res.data.records,
          record: get(res.data, `records.${keys[0]}.0`) || {}
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  getRecord = (record) => {
    let criteria = {
      id: record.id,
      is_organization: record.organization_id ? true : false
    }
    TeamsService.getRecord(criteria)
      .then(res => {
        console.log('single record', res);
        this.setState({
          record: res.data.record
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <div>
          {this.state.recordKeys.map((recordKey, index) => {
            let records = get(this.state.records, `${recordKey}`) || []; 
            return <div key={index}>
              <div>
                {recordKey}
              </div>
              {records.map(record => {
                return <div key={record.id}>
                  <div onClick={() => this.getRecord(record)}>{record.description || ''}</div>
                </div>
              })}            
            </div>
          })}
        </div>
        <div>
          <RecordDetail record={this.state.record || {}}/>
        </div>
      </div>
    );
  }
}
