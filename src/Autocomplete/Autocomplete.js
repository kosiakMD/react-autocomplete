import React, { useCallback, useMemo, useState } from 'react';
import DataService from '../services/data.service';
import './Autocomplete.css';
import { debounce } from '../helpers';

const Autocomplete = ({onSelect}) => {

  const [value, setValue] = useState('');
  const [list, setList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [request, setRequest] = useState(null);

  const service = useMemo(() => {
    return new DataService();
  }, [])

  const clearList = useCallback(() => setList([]), [setList]);

  const getList = useCallback(debounce(async (val) => {
    setLoading(true);
    request && request.clear();
    const newRequest = service.get(val);
    setRequest(newRequest);
    try {
      const newList = await newRequest;
      setList(newList);
    } finally {
      setLoading(false);
      setRequest(null);
    }
  }, 500), [request, service]);

  const onchange = useCallback((e) => {
    const val = e.target.value;
    setValue(val);
    if (val.length) {
      getList(val);
    } else {
      clearList();
    }
  }, [setValue, setList, service]);

  return (
    <div className="autoBox">
      <input id="autocomplete" value={value} onChange={onchange}/>
      <div>
        <div className={'status'}>{isLoading && 'is loading...'}</div>
        <ul>
          {list.map((value) =>
            <li
              key={value}
              onClick={() => {
                setValue(value);
                onSelect(value);
                clearList();
              }}
            >{value}</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Autocomplete;
