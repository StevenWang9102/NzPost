import React, { useState, useEffect } from 'react';
import { Pagination, Tabs } from 'antd';
import { FlexibleModule } from './FlexibleModule';
import { RingLoader } from 'react-spinners';
import { Skeleton } from 'antd';

const onChange = (key) => {
};

export const Navigation = props => {
  const [data, setData] = useState(null);
  const [currentTab, setCurrentTab] = useState("1");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [descriotion, setDescription] = useState("");
  const [modalData, setModalData] = useState({});
  const [paginationObj, setPaginationObj] = useState({
    page: 1,
    pageSize: 20,
    total: 0
  });


  const fetchData = async (newPagination = {}) => {
    let offset = 20;
    let pageSize = 20;

    if (newPagination && newPagination.page && newPagination.pageSize) {
      offset = newPagination.page * newPagination.pageSize;
      pageSize = newPagination.pageSize;
    }

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`);
      setLoading(true);
      const result = await response.json();
      let res = result.results;

      setTimeout(() => {
        const filtedData = filterFavoratedData(res);
        if (filtedData) {
          const extractedIds = filtedData.map(item => {
            const match = item.url.match(/\/(\d+)\/$/);
            return match ? parseInt(match[1], 10) : null;
          });
          setEachInfo(extractedIds);
          const tempPagination = {
            page: paginationObj.page,
            pageSize: paginationObj.pageSize,
            total: result.count
          };
          setPaginationObj(tempPagination);
        }
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const setEachInfo = async (idArray) => {
    const apiEndpoints = idArray.map(id => `https://pokeapi.co/api/v2/pokemon/${id}`);
    const promises = apiEndpoints.map(endpoint => fetch(endpoint));
    const responses = await Promise.all(promises);
    let data = await Promise.all(responses.map(response => response.json()));
    data && setData(data);
  };

  const fetchFavorateData = async (sortKey) => {
    const existingIDs = localStorage.getItem("favoratePokemon") || "";
    if (existingIDs !== "") {
      const idArray = existingIDs.split(',');
      const apiEndpoints = idArray.map(id => `https://pokeapi.co/api/v2/pokemon/${id}`);
      const promises = apiEndpoints.map(endpoint => fetch(endpoint));
      const responses = await Promise.all(promises);
      let data = await Promise.all(responses.map(response => response.json()));

      if (sortKey) {
        data = sortRawData(data, sortKey);
      }
      data && setData(data);
    }
  };

  const sortRawData = (data, key) => {
    const sortedResults = data.slice().sort((a, b) => {
      const fieldA = a[key];
      let nameA = "";
      let nameB = "";
      if (typeof fieldA === "number") {
        nameA = a[key];
        nameB = b[key];
      } else {
        nameA = a[key].toLowerCase();
        nameB = b[key].toLowerCase();
      }
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    return sortedResults;
  };

  const filterFavoratedData = (data) => {
    const existingNames = localStorage.getItem("favoratePokemon") || "";
    return data.filter(each => {
      let id = '';
      if (each) {
        if (each.id) {
          id = each.id;
        } else {
          const match = each.url.match(/\/(\d+)\/$/);
          if (match) {
            id = match[1];
          }
        }
      }
      return !existingNames.includes(id);
    });
  };

  const pushDefaultFavoriateToLocalStaorage = () => {
    let temp = localStorage.getItem("favoratePokemon") || "";
    if (!temp.includes("25")) {
      temp = `${temp}25`;
    }
    if (!temp.includes("4")) {
      temp = `${temp},4`;
    }
    if (!temp.includes("7")) {
      temp = `${temp},7`;
    }
    localStorage.setItem('favoratePokemon', temp);
  };

  useEffect(() => {
    if (currentTab === "1") {
      fetchData();
      pushDefaultFavoriateToLocalStaorage();
    }
    if (currentTab === "2") {
      fetchFavorateData();
    }
  }, [currentTab]);

  const items = [
    { key: '1', label: 'Total' },
    { key: '2', label: 'My Pokedex' },
  ];

  const onLoveItemClick = (id) => {
    const existingNames = localStorage.getItem("favoratePokemon") || "";
    const newNames = existingNames ? `${id},${existingNames}` : `${id}`;
    localStorage.setItem('favoratePokemon', newNames);
    fetchData();
  };

  const onDeleteClicked = (id) => {
    const existingNames = localStorage.getItem("favoratePokemon") || "";
    const newNames = existingNames.replace(`${id},`, "");
    localStorage.setItem('favoratePokemon', newNames);
    fetchFavorateData();
  };

  const onViewModalClick = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/characteristic/${id}/`);
    const result = await response.json();
    const englishDescription = result.descriptions.find(description => description.language.name === "en");
    const descriptionValue = englishDescription ? englishDescription.description : "-";

    const allRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const oneRes = await allRes.json();

    let type = "";
    try {
      type = oneRes.types[0].type.name;
    } catch {
      type = "-";
    }

    let image = "";
    if (oneRes && oneRes.id && oneRes.sprites) {
      image = oneRes.sprites.front_default;
      setModalData({
        name: oneRes.name,
        image: image,
        type: type,
        height: oneRes.height,
        weight: oneRes.weight,
        descriotion: descriptionValue,
      });
      setOpen(true);
    }
  };

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        onTabClick={(value) => { setCurrentTab(value); }}
      />

      {loading && <div>
        Loading...
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>}

      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
      }}>
        <RingLoader color={"#123abc"} loading={loading} size={150} />
      </div>

      <div>
        {currentTab === "1" && !loading && <FlexibleModule
          data={data}
          open={open}
          setOpen={setOpen}
          descriotion={descriotion}
          setDescription={setDescription}
          pageType="total"
          onLoveItemClick={onLoveItemClick}
          onDeleteClicked={onDeleteClicked}
          onSortClicked={(key) => { fetchFavorateData(key); }}
          loading={loading}
          onViewModalClick={onViewModalClick}
          modalData={modalData}
        />}

        {currentTab === "2" && !loading && data && <FlexibleModule
          data={data}
          open={open}
          setOpen={setOpen}
          descriotion={descriotion}
          setDescription={setDescription}
          pageType="favorate"
          onLoveItemClick={onLoveItemClick}
          onDeleteClicked={onDeleteClicked}
          onSortClicked={(key) => { fetchFavorateData(key); }}
          loading={loading}
          onViewModalClick={onViewModalClick}
          modalData={modalData}
        />}

        {!loading && currentTab === "1" && <Pagination
          defaultCurrent={1}
          defaultPageSize={20}
          total={paginationObj.total}
          style={{ marginTop: 20 }}
          onChange={(page, pageSize) => {
            setLoading(true);
            const newPagination = {
              page: page,
              pageSize: pageSize,
              total: paginationObj.total
            };
            setPaginationObj(newPagination);
            fetchData(newPagination);
          }} />
        }
      </div>
    </>
  );
};