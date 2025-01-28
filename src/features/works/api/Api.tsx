import { useEffect, useState } from "react";
import axios from "axios";

export const Api = () => {
  // URL
  const url = {
    works: 'https://admin.mumumugi.com/wp/wp-json/wp/v2/works',
    tax: 'https://admin.mumumugi.com/wp/wp-json/wp/v2/tax_works'
  }

  // flag
  const [actionFlag, setActionFlag] = useState(true);
  // works
  const [works, setWorks] = useState([]);
  // tax
  const [tax, setTax] = useState([]);

  useEffect(() => {
    if (!actionFlag) {
      return
    }

    // works
    axios
      .get(url.works)
      .then((res) => {
        setWorks(res.data)
      })
    // tax
    axios
      .get(url.tax)
      .then((res) => {
        setTax(res.data)
      })

    setActionFlag(false)
  }, []);

  return { works, tax }
}
