import axios from 'axios';

import { formatSearchResult, formatItemSearchResult } from '../services/formatterService';

export const handleSearchAction = (req, res) => {
    const query = req.query.q;
    if (query) {
        (async () => {
            try {
              const response = 
                await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(query)}`);
              
              const formattedRes = formatSearchResult(response.data); // A service should handle the logic
              return res.status(200).json(formattedRes);
            } catch (error) {
              console.log(error);
              return res.status(500).json({ message: 'Oops... Something bad happened!'});
            }
          })();
    }
};

export const handleItemSearchAction = (req, res) => {
  const id = req.params.id;
  if (id) {
    (async () => {
      try {
        const itemReqOptions = {
          method: 'get',
          baseURL: `https://api.mercadolibre.com/items/${id}`,
        }
        const itemRes = 
          await axios.get('', itemReqOptions);

        const itemDescReqOptions = {
          method: 'get',
          baseURL: `https://api.mercadolibre.com/items/${id}/description`,
        }  
        const itemDescRes = 
          await axios.get('', itemDescReqOptions);
        const formattedRes = formatItemSearchResult(itemRes.data, itemDescRes.data); // A service should handle the logic
        return res.status(200).json(formattedRes);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Oops... Something bad happened!'});
      }
    })();
  }
};