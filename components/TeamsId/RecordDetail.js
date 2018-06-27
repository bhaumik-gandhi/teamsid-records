import { get } from 'lodash';
import moment from 'moment';

export default class RecordDetail extends React.Component {

  getValueFromLabel = (details = [], label) => {

    if (!details.length) {
      return '-';
    }

    let obj = details.find(d => d.label === label) || null;
    if (!obj) {
      return '-';
    }
    if (label === 'Password') {
      return (Array(obj.value.length + 1)).join('*');
    }
    return obj.value || '-';
  }
  
  render() {
    let record = this.props.record || {};
    let fetching = this.props.fetching;
    let tokenError = this.props.tokenError || false;

    console.log("RECORD", record);
    
    if (fetching) {
      return <div className='loading'>Fetching data...</div>
    } else if (tokenError) {
      return <div className='loading'>Not Authorized</div>
    }

    return <div className='content-container'>
      <div className='label-div'>
        <div className='img-container'>
          <img style={{height:'60px'}} src={record.image} />
        </div>
        <div>
          URL
        </div>
        <div>
          USERNAME
        </div>
        <div>
          PASSWORD
        </div>
        <div>
          TAGS
        </div>
      </div>
      <div className='data-div'>
        <div>
          <div>{record.description}</div>
          <div style={{display: 'flex'}}>
            <div className='name-tag'>{(get(record, 'creator.name') || '').split(' ').map(x => x[0]).join('')}</div>
            <div style={{marginRight: '5px'}} className='dim-color'><strong>{get(record, 'creator.name') || ''}</strong></div>
            <div><span className='dim-color'>created</span>&nbsp;<strong>{get(record, 'type.name')}</strong> - <span className='dim-color'>{moment(record.updated_at).format('dddd, MMMM Do YYYY')}</span></div>
          </div>
        </div>
        <div>
          {this.getValueFromLabel(record.details, 'URL')}
        </div>
        <div>
          {this.getValueFromLabel(record.details, 'Username')}
        </div>
        <div>
          {this.getValueFromLabel(record.details, 'Password')}
        </div>
        <div>
          {record.tags && record.tags.length ? record.tags.map(tag => tag.tag).join(', ') : '-'}
        </div>
      </div>      
    </div>
  }
}