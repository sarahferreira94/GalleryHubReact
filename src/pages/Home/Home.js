import React, { useEffect, useState } from 'react';
import './HomeStyle.css';
import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import ReactVirtualizedTable from '../../components/Table';
import axios from 'axios';
import { baseUrl } from '../../config';

const Home = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');

  const getData = () => {
    const config = {
      headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${ window.localStorage.getItem( 'token' ) }`,
      },
    };

    axios
      .get(
        `${baseUrl}/v1/artwork?country=${ country }`,
        config
      )
      .then(response => {
        setData(response.data);
        getCountries();
      })
      .catch(error => {
        console.log(`Erro ${error}`);
      });
  };

  const getCountries = () => {
    const config = {
      headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${ window.localStorage.getItem( 'token' ) }`,
      },
    };

    axios
      .get(
        `${baseUrl}/v1/country`,
        config
      )
      .then(response => {
        const countriesData = response.data;

        const allCountriesOption = { idcountry: 0, name: 'All Countries' };
        const countriesWithAllOption = [allCountriesOption, ...countriesData];

        setCountries(countriesWithAllOption);
        setLoading(false);
      })
      .catch(error => {
        console.log(`Erro ${error}`);
      });
  };

  useEffect(() => {
    getData();
  }, [country]);

  return (
    <div className='homeBox'>
      <div className='homeContainer'>
        <h2>Artworks</h2>
          { loading ? <CircularProgress /> : ( 
            <div>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Country</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={country}
                  label="Country"
                  placeholder='Country'
                  onChange={(e)=>setCountry(e.target.value)}
                >
                  {countries.map((item) => (
                    <MenuItem key={item.idcountry} value={item.idcountry}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <ReactVirtualizedTable data={data} />
            </div>
          ) }
        
      </div>
    </div>
  );
};

export default Home;
