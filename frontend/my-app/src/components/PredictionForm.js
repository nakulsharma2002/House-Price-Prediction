import React, { useState } from 'react';
import axios from 'axios';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    area: '', bedrooms: '', bathrooms: '', stories: '', mainroad: '',
    guestroom: '', basement: '', hotwaterheating: '', airconditioning: '',
    parking: '', prefarea: '', furnishingstatus: ''
  });

  const [predictedPrice, setPredictedPrice] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputValues = Object.values(formData).map(Number);  // Convert all to numbers
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        input: inputValues
      });
      setPredictedPrice(response.data.price);
    } catch (error) {
      console.error("Error in prediction:", error);
    }
  };

  return (
    <div style={{margin:'auto',maxWidth:'500px',width:'1520px'}}>
      {/* <h2>House Price Prediction</h2> */}
      <form onSubmit={handleSubmit} style={{display:'block',textAlign:'center'}}>
        {/* {Object.keys(formData).map((key) => (
          <div key={key} class="mb-3">
            <label for="exampleInputEmail1" class="form-label">{key}</label>
            <input type="number" name={key} value={formData[key]} onChange={handleChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
        ))} */}
        <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label" style={{paddingRight:'13px',display:'block'}}>Area</label>
        <input type="number" name="area" onChange={handleChange} placeholder="Area" style={{textAlign:'center'}} />
        </div>

        <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label" style={{paddingRight:'13px',display:'block'}}>Bedrooms</label>
        <input type="number" name="bedrooms" onChange={handleChange} placeholder="Bedrooms" style={{textAlign:'center'}} />
        </div>

        <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label" style={{paddingRight:'13px',display:'block'}}>Bathrooms</label>
        <input type="number" name="bathrooms" onChange={handleChange} placeholder="Bathrooms" style={{textAlign:'center'}} />
        </div>

        <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label" style={{paddingRight:'13px',display:'block'}}>Stories</label>
        <input type="number" name="stories" onChange={handleChange} placeholder="Stories" style={{textAlign:'center'}} />
        </div>


        
        <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label" style={{paddingRight:'13px',display:'block'}}>MainRoad</label>
        <input type="number" name="mainroad" onChange={handleChange} placeholder="0 for No , 1 for Yes" style={{textAlign:'center'}} />
        </div>

        <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label" style={{paddingRight:'13px',display:'block'}}>GuestRoom</label>
        <input type="number" name="guestroom" onChange={handleChange} placeholder="0 for No , 1 for Yes" style={{textAlign:'center'}} />
        </div>

        <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label" style={{paddingRight:'13px',display:'block'}}>Basement</label>
        <input type="number" name="basement" onChange={handleChange} placeholder="0 for No , 1 for Yes" style={{textAlign:'center'}} />
        </div>

        <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label" style={{paddingRight:'13px',display:'block'}}>Hot water heating</label>
        <input type="number" name="hotwaterheating" onChange={handleChange} placeholder="0 for No , 1 for Yes" style={{textAlign:'center'}} />
        </div>



        <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label" style={{paddingRight:'13px',display:'block'}}>Air conditioning</label>
        <input type="number" name="airconditioning" onChange={handleChange} placeholder="0 for No , 1 for Yes" style={{textAlign:'center'}} />
        </div>

        <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label" style={{paddingRight:'13px',display:'block'}}>Parking</label>
        <input type="number" name="parking" onChange={handleChange} placeholder="Parking" style={{textAlign:'center'}} />
        </div>

        <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label" style={{paddingRight:'13px',display:'block'}}>Prefarea</label>
        <input type="number" name="prefarea" onChange={handleChange} placeholder="0 for No , 1 for Yes" style={{textAlign:'center'}} />
        </div>

        <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label" style={{paddingRight:'13px',display:'block'}}>Furnishing Status</label>
        <input type="number" name="furnishingstatus" onChange={handleChange} placeholder="0 for unfurnished , 1 for furnished , 2 for semi-furnished" style={{textAlign:'center',width:'415px'}} />
        </div>


        
        
        <button type="submit" style={{width:'148px',borderRadius:'10px'}} >Predict</button>
      </form>
      {predictedPrice && <h3 style={{textAlign:'center',paddingTop:'23px'}}>Predicted Price: {predictedPrice}</h3>}
    </div>
  );
};

export default PredictionForm;
