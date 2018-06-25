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
      serverError: false,
      fetching: false,
      tokenError: false
    };
  }

  componentDidMount() {
    this.getToken();
    this.getAllRecords();
  }

  getToken = () => {
    let token = sessionStorage.getItem("session_token");
       
      TeamsService.getToken()
        .then(res => {
          console.log('get token', res);
          sessionStorage.setItem('session_token', res.data.session_token) || '';
        })
        .catch(err => {
          console.error(err)
        })
    
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
          loading: false
        }, () => {
          if (get(res.data, `records.${keys[0]}.0`)) {
            this.getRecord(get(res.data, `records.${keys[0]}.0`));
          }
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({
          loading: false,
          serverError: true,
          tokenError: false
        })
      })
  }

  getRecord = (record) => {
    this.setState({
      fetching: true
    })
    let criteria = {
      id: record.id,
      is_organization: record.organization_id ? true : false
    }
    TeamsService.getRecord(criteria)
      .then(res => {
        console.log('single record', res);
        if (res.data.status !== 'error') {
          this.setState({
            fetching: false,
            record: res.data.record,
            loading: false,
            serverError: false,
            tokenError: false,
          })
        } else {
          this.setState({
            loading: false,
            serverError: false,
            tokenError: true,
            fetching: false
          })
          throw 'TOKEN_ERROR'
        }
      })
      .catch(err => {
        console.error('TOKEN', err)
      })
  }

  render() {
    console.log(this.state);
    if (this.state.loading) {
      return <div className='loading'>Fetching data...</div>
    } else if (this.state.serverError) {
      return <div className='loading' style={{color: 'red'}}>Server error...</div>
    }
    return (
      <div className='main-container'>
        <div className='sidebar'>
          {this.state.recordKeys.map((recordKey, index) => {
            let records = get(this.state.records, `${recordKey}`) || []; 
            return <div key={index}>
              <div className='record-alpha'>
                {recordKey}
              </div>
              {records.map(record => {
                return <div key={record.id} className='records-list'>
                  <div className={ this.state.record.id === record.id ? 'active' : ''} style={{display: 'flex',}}>
                    <div><img src={record.image} className='record-list-img' style={{height:'32px', width: '32px', marginRight: '8px'}}/></div>
                    <div onClick={() => this.getRecord(record)} className='record-title'>{record.description || ''}</div>
                  </div>
                </div>
              })}            
            </div>
          })}
        </div>
        <div className='content-detail'>
          <RecordDetail record={this.state.record || {}} fetching={this.state.fetching} tokenError={this.state.tokenError}/>
        </div>
      </div>
    );
  }
}
