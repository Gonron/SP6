import React, { Component } from "react";

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';

const URL = 'http://localhost:3333/countries';

const columns = [{
  dataField: 'name',
  text: 'Name',
}, {
  dataField: 'capital',
  text: 'Capital',
}, {
  dataField: 'region',
  text: 'Region',
}, {
  dataField: 'population',
  text: 'Population',
}, {
  dataField: 'area',
  text: 'Area',
}, {
  dataField: 'timezones',
  text: 'Time Zones',
}, {
  dataField: 'borders',
  text: 'Borders',
}, {
  dataField: 'topLevelDomain',
  text: 'TL-domain',
}, {
  dataField: 'currencies',
  text: 'Currencies'
}, {
  dataField: 'languages',
  text: 'Languages'
}];

class CountryTable extends Component {
  constructor(props) {
    super(props);
    console.log(props.factory);

    this.state = { factory: props.factory, lables: [], countries: [], sizePerPage: 10, page: 1, totalSize: 0 }
  }

  async componentDidMount() {
    console.log(this.state.factory);

    const { page, sizePerPage } = this.state
    await this.handleTableChange("didMount", { page, sizePerPage });
    await this.update();


  }

  handleTableChange = async (type, props) => {
    const { page, sizePerPage, sortField, sortOrder } = props;
    console.log(props)  //Monitor this output, when you test this step
    const sortStr = (sortField && sortOrder) ? `&_sort=${sortField}&_order=${sortOrder}` : "";
    const currentIndex = (page - 1) * sizePerPage;
    const end = currentIndex + sizePerPage;
    const URI = `${URL}?_start=${currentIndex}&_end=${end}${sortStr}`;
    let p = await fetch(URI).then(res => {
      const totalSize = Number(res.headers.get("x-total-count"));
      if (totalSize) { this.setState({ totalSize }) }
      return res.json()
    });
    const name = await p;
    this.setState({ page, sizePerPage, name })
  }


  update = async () => {
    const lables = await this.state.factory.getLabels();
    const countries = await this.state.factory.getCountries();
    const mappedCountries = countries.map((c) => {
      let e = {}
      e.name = c.name
      e.capital = c.capital
      e.region = c.region
      e.population = c.population
      e.area = c.area
      e.timezones = c.timezones[0]
      e.borders = c.borders[0]
      e.topLevelDomain = c.topLevelDomain[0]
      e.currencies = c.currencies[0]
      e.languages = c.languages[0]
      return e

    })
    console.log(mappedCountries)
    this.setState({ lables, countries: mappedCountries })

  }

  render() {
    const { page, sizePerPage, totalSize } = this.state;
    return (
      <BootstrapTable
        striped
        hover
        bootstrap4
        keyField='id'
        data={this.state.countries}
        columns={columns}
        //filter={ filterFactory() }
        onTableChange={this.handleTableChange}
        pagination={paginationFactory({ page, sizePerPage, totalSize })}
      />
    );
  }
}
export default CountryTable;