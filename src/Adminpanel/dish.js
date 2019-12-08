import React, {useEffect, useState, useRef} from 'react'
import FirebaseContext from '../Firebase/context.js';
import dishExample from '../img/dish-example.jpg';
import {
  Link,
  useParams,
  Redirect,
  useHistory,
} from "react-router-dom";

const Editdish = (props)=> {
  const firebase = React.useContext(FirebaseContext);
  const [dishDetail, setdishdetail] = useState({
    name: '',
    ingridients: '',
    description: '',
    price: '',
    gramms: '',
    time: '',
    category: 'drinks',
  });
  const [filter, setfilter] = useState('drinks');
  const [uploadUrl, setuploadUrl] = useState('');
  const [path, setpath] = useState('');
  const [uploadPercentages, setuploadPercentages] = useState('0');
  const [disable, setdisable] = useState(true);

  const imgUpload = useRef();
  const fileRef = useRef();
  let {category, dishname} = useParams();
  const history = useHistory();


  useEffect(()=>{
    if(props.loadData){
    const ref = firebase.firestore().collection(`menu/all/${category}`).doc(dishname);
    const unsubscribe =
      ref.get().then(doc=>{
        const data = doc.data();
        setdishdetail(data);
        setuploadUrl(data.url);
        setpath(data.file_path)
      })
    setfilter(category);
  }
  }, [setdishdetail, setuploadUrl])

  function updateInput(value){
    const newData = ({
      ...dishDetail,
    })
    newData[value.name] = value.value;
    setdishdetail(newData);
    setdisable(false);
  }

  function onSubmit (e){
    e.preventDefault();
    const ref = firebase.firestore().collection(`menu/all/${filter}`).doc(dishDetail.name);
    const obj = {
      name: dishDetail.name,
      ingridients: dishDetail.ingridients||'',
      description: dishDetail.description || '',
      price: dishDetail.price,
      gramms: dishDetail.gramms,
      time: dishDetail.time,
      category: filter,
      url: uploadUrl,
      file_path: path,
    }
    if(props.loadData){
      ref.update(obj)
      .then(() => {
        console.log('data Updated')
        history.push('/adminpanel/menu/')
      });
    }
    else{
      ref.set(obj)
      .then(() => {
        console.log('new dish save to database')
        history.push('/adminpanel/menu/')
      });
    }

  }

  function uploadFile(target) {
    // Get file
    const file = target.files[0];
    console.log(file);
    const file_path = `menu_img/${file.name}`;
    // Create storage ref
    const storageRef = firebase.storage().ref().child(file_path)
    // Upload file
    const task = storageRef.put(file)
    // Update progress bar
    task.on('state_changed',
      function progress(snapshot){
        let percentages = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setuploadPercentages(percentages);
      },
      function error(err){
        console.log(err)
      },
      function complete() {
        task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
          console.log(file_path);
          setuploadUrl(downloadURL);
          setpath(file_path)

          if(props.loadData){
            firebase.firestore().collection(`menu/all/${filter}`).doc(dishname).update({
              url: downloadURL,
              file_path: file_path,
            })
          }

        });


      }
    )
  }

  function deleteImg(target){
    firebase.storage().ref().child(path).delete()
      .then(()=>{
        resetFileInput();
        console.log('Img successfully deleted from DB')
      })
      .catch((error) =>
        // Uh-oh, an error occurred!
        console.log(error)
      );
  }

  function resetFileInput(){
    setuploadPercentages(0);
    setuploadUrl('');
    fileRef.current.value = '';
  }

  function deleteItem(e){
    e.preventDefault();
    const ref = firebase.firestore().collection(`menu/all/${category}`).doc(dishname);
    ref.delete().then(()=>{
      console.log(`Document successfully deleted!`);
      history.push('/adminpanel/menu/')
    })
    .catch(e =>{
      console.log(e);
    })

  }


  return(
    <div className="admin-panel-content">
    <form onSubmit={onSubmit}>
    <div className="admin-panel-content-head">
      <Link to ='/adminpanel/menu'>Back to menu</Link>
        {props.loadData?<div>Editing {dishDetail.name}</div>:<div>Adding new dish</div>}
      <div className="btn-right">
        {props.loadData&&<button className="delete large" onClick={(e)=>deleteItem(e)}>Delete dish</button>}
        <button type="submit" disabled={disable} className="save-changes large">Save changes</button>
      </div>
    </div>
    <div className="dish-edit-wrapper">
      <div className="dish-edit-col-left">
        <label>Dish Title</label>
        <input
          name="name"
          value={dishDetail.name}
          onChange={(e)=>updateInput(e.currentTarget)}
          type="text"
          placeholder="Dish Title"
        />
        <label>Photo</label>

        {uploadUrl?<div className='tumb' ref={imgUpload} style={{backgroundImage: `url(${uploadUrl})`}} onClick={e => deleteImg(e.currentTarget)}></div>
                  :<>
                    <input
                      className='dishPhoto'
                      onChange={e => uploadFile(e.currentTarget)}
                      type="file"
                      ref={fileRef}
                    />
                    <progress value={uploadPercentages} max='100' className='uploader'>0%</progress>
                  </>
        }
        <label>Ingridients</label>
        <input
          name="ingridients"
          value={dishDetail.ingridients}
          onChange={(e)=>updateInput(e.currentTarget)}
          type="text"
          placeholder="Ingridients"
        />
        <label>Description</label>
        <textarea
          name="description"
          value={dishDetail.description}
          onChange={(e)=>updateInput(e.currentTarget)}
          type="text"
          placeholder="Description"
        />
      </div>

      <div className="dish-edit-col-right">
        <label>Dish Category</label>
        <select value={filter} onChange={e => setfilter(e.currentTarget.value)}>
          <option value="drinks">Drinks</option>
          <option value="meals">Meals</option>
          <option value="desserts">Desserts</option>
        </select>
        <label>Price</label>
        <input
          name="price"
          value={dishDetail.price}
          onChange={(e)=>updateInput(e.currentTarget)}
          type="number"
          placeholder="Price"
        />
        <label>Weight</label>
        <input
          name="gramms"
          value={dishDetail.gramms}
          onChange={(e)=>updateInput(e.currentTarget)}
          type="number"
          placeholder="Weight"
        />
        <label>Time</label>
        <input
          name="time"
          value={dishDetail.time}
          onChange={(e)=>updateInput(e.currentTarget)}
          type="number"
          placeholder="Time"
        />
        </div>
      </div>
    </form>
    </div>
  )
}

export default Editdish;
