
import React, { Component } from 'react';
import { Focusable, FocusableSection } from 'react-js-spatial-navigation';
import classes from './Discovery.module.css';

const Icon = () => (
    <svg width="90%" height="90%" viewBox="0 0 187 235" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:"2"}}>
    <g id="Page-1" opacity="0.2">
        <g transform="matrix(1,0,0,1,-2,0)">
            <g id="Error1">
                <g id="NothingFound">
                    <g id="Group">
                        <g id="Group-26">
                            <path id="Fill-7" d="M46.709,53.361L46.709,65.153C49.583,65.834 68.843,69.461 94.316,69.461C108.215,69.461 123.967,68.381 139.914,65.153L139.914,53.361C156.894,56.304 165.614,60.478 165.614,63.236C165.614,67.893 140.783,76.578 93.311,76.578C45.84,76.578 21.008,67.893 21.008,63.236C21.008,60.478 29.729,56.304 46.709,53.361M93.311,5.43C116.183,5.43 134.791,23.994 134.791,46.811L134.791,60.927C122.148,63.199 108.555,64.349 94.316,64.349C75.156,64.349 59.301,62.241 51.832,60.949L51.832,46.811C51.832,23.994 70.439,5.43 93.311,5.43M93.311,107.174C57.849,107.174 28.291,91.576 22.185,71.078C35.892,78.728 69.164,81.689 93.311,81.689C117.459,81.689 150.729,78.728 164.438,71.078C158.332,91.576 128.772,107.174 93.311,107.174M93.311,112.285C136.004,112.285 170.737,90.282 170.737,63.236C170.737,55.926 157.232,51.135 139.914,48.269L139.914,46.811C139.914,21.134 119.048,0.318 93.311,0.318C67.573,0.318 46.709,21.134 46.709,46.811L46.709,48.269C29.391,51.135 15.884,55.926 15.884,63.236C15.884,90.282 50.618,112.285 93.311,112.285" style={{fill: "#505a67"}}/>
                            <path id="Fill-9" d="M93.311,86.183C90.24,86.183 87.748,88.667 87.748,91.733C87.748,94.797 90.24,97.282 93.311,97.282C96.382,97.282 98.874,94.797 98.874,91.733C98.874,88.667 96.382,86.183 93.311,86.183" style={{fill: "#505a67"}}/>
                            <path id="Fill-11" d="M130.79,83.755C128.168,83.755 126.042,85.877 126.042,88.492C126.042,91.108 128.168,93.229 130.79,93.229C133.412,93.229 135.538,91.108 135.538,88.492C135.538,85.877 133.412,83.755 130.79,83.755" style={{fill: "#505a67"}}/>
                            <path id="Fill-13" d="M55.832,83.755C53.21,83.755 51.084,85.877 51.084,88.492C51.084,91.108 53.21,93.229 55.832,93.229C58.454,93.229 60.58,91.108 60.58,88.492C60.58,85.877 58.454,83.755 55.832,83.755" style={{fill: "#505a67"}}/>
                            <path id="Fill-15" d="M62.107,49.492L63.918,51.299L87.138,28.134L85.327,26.327L62.107,49.492Z" style={{fill: "#505a67"}}/>
                            <path id="Fill-17" d="M86.748,37.381L84.937,35.574L76.804,43.688L78.615,45.495L86.748,37.381Z"  style={{fill: "#505a67"}}/>
                            <path id="Fill-21" d="M93.969,229.225L96.531,229.225L96.531,119.225L93.969,119.225L93.969,229.225Z"  style={{fill: "#505a67"}}/>
                            <path id="Fill-24" d="M62.79,115.999L61.648,115.418L60.508,114.836L2.001,229.062L3.14,229.643L4.282,230.225L62.79,115.999Z"  style={{fill: "#505a67"}}/>
                            <path id="Fill-25" d="M188.837,228.53L127.994,115.071L126.864,115.674L125.735,116.276L186.577,229.735L187.707,229.133L188.837,228.53Z" style={{fill: "#505a67"}}/>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg> 
  );

class Discovery extends Component {
    baseUrl = 'http://zeroconf:15051/a1/xploretv/v1/zeroconf';
    serviceName = 'TV Dashboard';
    state = {error: {code: 'Unknown', msg: 'Error', reason: 'Failed to fetch'}};
    loaded = 0;
    mainItems = [{key: 'ipv4', name: 'IPv4'}, {key: 'ipv6', name: 'IPv6'}, {key: 'port', name: 'Port'}, {key: 'name', name: 'Name'}, { key: 'domain', name: 'Domain'},
                 { key: 'host', name: 'Host'}, {key: 'type', name: 'Service Type'}, { key: 'subtype', name: 'Service Subtype'}]
    showRight = false;


    parseData(data){
        const services = {};
        data.forEach(service => {
            const node = {name: service.name, domain: service.domainName, host: service.hostName, ipv4: service.addresses.ipv4, ipv6: service.addresses.ipv6,
                          type: service.service.type, subtype: service.service.subtype, port: String(service.service.port), record: service.service.txtRecord};
            if (service.hostName in services){
                services[service.hostName].push(node);
            } else {
                services[service.hostName] = [node];
            }
        });
        if ('services' in this.state){
            this.setState({services: services});
        } else {
            this.setState({services: services, selIdx: 0, detailIdx: 0, error: false});
        }
    }

    requestServices(){
            fetch(this.baseUrl, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then(async res => {
                const resp = await res.json();
                if (!res.ok){
                    return this.setState({ error: { code: resp.code, msg: resp.message, reason: resp.reason, host: process.env.REACT_APP_DISCOVERY_URL } });
                }
                return this.parseData(resp.services);
            }).catch(error => {
                return this.setState({error: {code: 'Unknown', msg: 'Error', reason: error.message, host: process.env.REACT_APP_DISCOVERY_URL}});
            });
    }

    loadData() {
        if (this.loaded === 0)
        {
            fetch(this.baseUrl, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    name: this.serviceName,
                    replaceWildcards: true,
                    serviceProtocol: 'any',
                    service: {
                        type: '_http._tcp',
                        port: 80,
                        txtRecord: {
                            version: '1.0',
                            provider: 'A1 Telekom Austria Group',
                            product: 'A1 Service Discovery',
                            path:  window.location.protocol + '//' + window.location.hostname + ':' + window.location.port,
                        }
                    }
                }
            )
            })
            .then(response => response.json())
            .then(response => {
                if (response.code !== 201 && response.code !== 409){
                    return this.setState({error: {code: response.code, msg: response.message, reason: response.reason, host: this.baseUrl}});
                }
                this.requestServices();
            })
            .catch(error => {
                return this.setState({error: {code: 'Unknown', msg: 'Error', reason: error.message, host: this.baseUrl}});
            })
        } else {
            this.requestServices();
        }


    }

    componentDidMount(){
            this.loadData();
            this.loaded = Date.now();
        }

    changeIdx = (event, idx) => {
        if ('services' in this.state){
            this.showRight = false;
            this.setState({selIdx: idx, detailIdx: 0});
            event.target.scrollIntoView({behavior: 'smooth', inline: 'center', block: 'center'});
        }
    }

    changeDetailIdx = (event, idx) => {
        if ('services' in this.state){
            this.showRight = true;
            this.setState({detailIdx: idx});
            event.target.scrollIntoView({behavior: 'smooth', inline: 'center', block: 'center'});
        }
    }

    getNodes(){
        if ('services' in this.state){
            return (Object.keys(this.state.services).map((key, idx) => {
                return(
                    <Focusable className={classes.Row + (idx === 0 ? ' menu-active' : '')} key={idx}
                        onFocus={(event) => this.changeIdx(event, idx)}
                        onKeyUp={(event) => this.props.hideMenu(event)}>
                        <p className={classes.Name}>{this.state.services[key][0].host.replace(/(.local.$|.$)/i, '')}</p>
                        <p className={classes.Address}>{this.state.services[key][0].ipv4[0]}
                        <span className={classes.Number}> ({this.state.services[key].length === 1 ? 'One service' : this.state.services[key].length + ' services'})</span>
                        </p>
                    </Focusable>
                )
            })
            )
        }
    }

    getServices(){
        if ('services' in this.state){
            let index = this.state.selIdx;
            if (this.state.selIdx > Object.keys(this.state.services).length) {
                index = 0;
            }

            const service = this.state.services[Object.keys(this.state.services)[index]];
            return (
                <>
                    <p className={classes.Address}>Address</p>
                    <p className={classes.Name}>{service[0].host}</p>
                    {service[0].ipv4.map((ip, idx) => {
                        return(<p key={'ipv4-' + idx} className={classes.Name}>{ip}</p>)
                    })}
                    {service[0].ipv6.map((ip, idx) => {
                        return(<p key={'ipv6-' + idx} className={classes.Name}>{ip}</p>)
                    })}
                    <div className={classes.InfoWrap}>
                        <p className={classes.Address}>Services</p>
                        {service.map((ser, idx) => {
                            return(
                                <Focusable className={classes.InfoRow} key={idx}
                                    onFocus={(event) => this.changeDetailIdx(event, idx)}
                                    onKeyUp={(event) => this.props.hideMenu(event)}>
                                    <p className={classes.Name}>{ser.name}</p>
                                    <p className={classes.Type}>{ser.type}</p>
                                </Focusable>
                            )
                        })}
                    </div>
                </>
            )
        }
    }

    getLink(service, ip){
        let url = "";
        if (service.record['get'] && service.record['get'].startsWith('http')){
            url = service.record['get'];
        } else {
            url = 'http://' + ip + ':' + String(service['port']) + (service.record['get'] ? service.record['get'] : '');
        }
        return url;
    }

    getButton(service){
        if (service['type'].includes('http')){
            return(service['ipv4'].map((ip, idx) => {
                return(
                    <div className={classes.BtnWrap} key={'open_btn-' + idx}>
                        <Focusable className={classes.Btn} onClickEnter={() => {window.open(this.getLink(service, ip), '_blank')}}>
                            {service['ipv4'].length > 1 ? 'Open (' + idx +')': 'Open'}
                        </Focusable>
                    </div>
                )
            }))
        }
    }

    getDetailValue(service, item){
        if (Array.isArray(service[item.key])){
            return (service[item.key].map((it, idx) => {
                return(<p key={item.key + '-' + idx} className={classes.InfoValue}>{it}</p>)
            }))
        } else {
            return(<p className={classes.InfoValue}>{service[item.key]}</p>)
        }
    }

    getServiceDetail(){
        if ('services' in this.state){
            let index = this.state.detailIdx;
            if (this.state.services[Object.keys(this.state.services)[this.state.selIdx]].length < index + 1){
                index = 0;
                return
            }

            const service = this.state.services[Object.keys(this.state.services)[this.state.selIdx]][index];
            return(
                <FocusableSection sectionId='detail-service'
                    neighborUp=''
                    neighborDown=''
                    neighborLeft='@detail-services'
                    neighborRight=''
                    className={classes.RightPanel + ' ' + (this.showRight ? classes.Show : classes.Hide)}>
                        <div className={classes.Frame}>
                            {this.getButton(service)}
                            <p className={classes.InfoTitle}>Core</p>
                            {this.mainItems.map((item, idx) => {
                                if (service[item.key] && service[item.key].length > 0){
                                    return(
                                        <Focusable className={classes.DetailRow} key={'detail_' + idx}
                                            onFocus={(event) => {event.target.scrollIntoView({behavior: 'smooth', inline: 'center', block: 'center'})}}>
                                            <p className={classes.InfoHead}>{item.name}</p>
                                            {this.getDetailValue(service, item)}
                                        </Focusable>
                                    )
                                } else return(null)
                            })}
                            <br></br>
                            <p className={classes.InfoTitle}>Data</p>
                            {Object.keys(service.record).map((item) => {
                                return(
                                    <Focusable className={classes.DetailRow} key={item}
                                        onFocus={(event) => {event.target.scrollIntoView({behavior: 'smooth', inline: 'center', block: 'center'})}}>
                                        <p className={classes.InfoHead}>{item}</p>
                                        <p className={classes.InfoValue}>{service.record[item]}</p>
                                    </Focusable>
                                )
                            })}
                        </div>
                </FocusableSection>
            )
        }
    }
    getMenu() {
            if (this.state.error.code !== "Unknown" && !this.state.hasOwnProperty("services")) {
                return(<div>loading</div>);
            }
            else if (this.state.error !== false && !this.state.hasOwnProperty("services")){
                return(
                        <div className={'modal-menu'} ref={this.props.modalRef}>
                            <div className={classes.ServiceWrap}>
                                <FocusableSection sectionId='main-service'
                                        className={classes.ErrorWrap}>
                                    <div className={classes.ErrorItem}>
                                        <Icon/>
                                    </div>
                                    <div className={classes.ErrorItem}><strong>Ups, da ist etwas schief gelaufen.</strong> Wahrscheinlich fehlt das Zeroconfiguration Networking Service. Bitte wenden Sie sich an den Gerätehersteller oder an Ihren Dienstanbieter.</div>
                                    <div className={classes.ErrorItem}><strong>Ooops, something went wrong.</strong> Probably the Zeroconfiguration Networking Service is missing. Please contact the device manufacturer or your service provider.</div>
                                    <div className={classes.ErrorCode}><strong>Host:</strong> {this.state.error.host}</div>
                                    <div className={classes.ErrorCode}><strong>Code:</strong> {this.state.error.code}</div>
                                    <div className={classes.ErrorMsg}><strong>{this.state.error.msg}:</strong> {this.state.error.reason}</div>
                                </FocusableSection>
                            </div>
                        </div>
                )
            }  
            else {
                return(
                <div className={classes.Background}>
                <h1 className={classes.Title}>Service Discovery</h1>
                <div className={classes.ServiceWrap}>
                    <FocusableSection sectionId='main-service'
                        neighborUp='@section_header'
                        neighborDown=''
                        neighborRight='@detail-services'
                        className={classes.LeftPanel}>
                            <div className={classes.Frame}>
                                <p className={classes.Address + ' ' + classes.TextCenter}>Hosts</p>
                                {this.getNodes()}
                            </div>
                    </FocusableSection>
                    <FocusableSection sectionId='detail-services'
                        neighborUp='@section_header'
                        neighborDown=''
                        neighborLeft='@main-service'
                        neighborRight='@detail-service'
                        className={classes.MidPanel}>
                            <div className={classes.Frame}>
                                {this.getServices()}
                            </div>
                    </FocusableSection>
                    {this.getServiceDetail()}
                </div>
            </div>
                )
            }
        }

    render(){
        return (
            this.getMenu()

        );
                     }
}

export default Discovery;
