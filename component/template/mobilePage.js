import Card from "@/component/module/card";;
import { useEffect, useState } from "react";
import Information from "../module/information";
export default function MobilePage({data}){

    let [filter , setFilter] = useState({
        apple : false,
        samsung : false,
        xiaomi : false,
        minPrice : '',
        maxPrice : '',
        minMemory : '',
        maxMemory : '', 
        minRam : '',
        maxRam : '',
        err : ''
    }) 
    let [filteredBrand , setFilteredBrand] = useState([])
    let [filteredPrice , setFilteredPrice] = useState([])
    let [filteredRam , setFilteredRam] = useState([]) 
    let [filteredMemory , setFilteredMemory] = useState([])
    let [showMoreBtn , setShowMoreBtn] = useState(true)
    useEffect(() => setFilteredBrand(brandFunc()), [filter])
    useEffect(() => setFilteredPrice(priceFunc()), [filteredBrand])
    useEffect(() => setFilteredRam(ramFunc()), [filteredPrice])
    useEffect(() => setFilteredMemory(memoryFunc()) , [filteredRam])
    
    let finalyFilter = showMoreBtn ? filteredMemory.slice(0 , 3) : filteredMemory
    let brandFunc = () => {
        if(filter.apple && filter.samsung && filter.xiaomi){return (data.filter(item => item.brand))
        }else if(!filter.apple && filter.samsung && filter.xiaomi){return (data.filter(item => item.brand != 'apple'))
        }else if(filter.apple && !filter.samsung && filter.xiaomi){return (data.filter(item => item.brand != 'samsung'))
        }else if(filter.apple && filter.samsung && !filter.xiaomi){return (data.filter(item => item.brand != 'xiaomi'))
        }else if(!filter.apple && !filter.samsung && filter.xiaomi){return (data.filter(item => item.brand == 'xiaomi'))
        }else if(filter.apple && !filter.samsung && !filter.xiaomi){return (data.filter(item => item.brand == 'apple'))
        }else if(!filter.apple && filter.samsung && !filter.xiaomi){return (data.filter(item => item.brand == 'samsung'))
        }else if(!filter.apple && !filter.samsung && !filter.xiaomi){return (data.filter(item => item.brand))
        } 
    }
    let priceFunc = () => {
        if (filter.minPrice.length != 0 && filter.maxPrice.length != 0) {
            return (filteredBrand.filter(item => +item.price >= +filter.minPrice && +item.price <= +filter.maxPrice))  
        }else if (filter.minPrice.length != 0 && filter.maxPrice.length == 0) {
            return (filteredBrand.filter(item => +item.price >= +filter.minPrice))  
        }else if (filter.minPrice.length == 0 && filter.maxPrice.length != 0) {
            return (filteredBrand.filter(item => +item.price <= +filter.maxPrice)) 
        }else if (filter.minPrice.length == 0 && filter.maxPrice.length == 0) {
            return (filteredBrand.filter(item => item)) 
        }
    }
    let ramFunc = () => {
        if (filter.minRam != '' && filter.maxRam != '') {
            return (filteredPrice.filter(item => +item.detailes.ram >= +filter.minRam && +item.detailes.ram <= +filter.maxRam))  
        }else if (filter.minRam != '' && filter.maxRam == '') {
            return (filteredPrice.filter(item => +item.detailes.ram >= +filter.minRam))  
        }else if (filter.minRam == '' && filter.maxRam != '') {
            return (filteredPrice.filter(item => +item.detailes.ram <= +filter.maxRam)) 
        }else if (filter.minRam == '' && filter.maxRam.length == 0) {
            return (filteredPrice.filter(item => item)) 
        }
    }
    let memoryFunc = () => {
        if (filter.minMemory != '' && filter.maxMemory != '') {
            return (filteredRam.filter(item => +item.detailes.memory >= +filter.minMemory && +item.detailes.memory <= +filter.maxMemory))  
        }else if (filter.minMemory != '' && filter.maxMemory == '') {
            return (filteredRam.filter(item => +item.detailes.memory >= +filter.minMemory))  
        }else if (filter.minMemory == '' && filter.maxMemory != '') {
            return (filteredRam.filter(item => +item.detailes.memory <= +filter.maxMemory)) 
        }else if (filter.minMemory == '' && filter.maxMemory.length == 0) {
            return (filteredRam.filter(item => item)) 
        }
    }
    let changehandler = (e) => setFilter({...filter , [e.target.name] : e.target.value})
    let changeBrandHandler = (e) => {
        const Name = e.target.name;
        if(Name == 'apple'){setFilter({...filter , apple : !filter.apple})
        }else if(Name == 'xiaomi'){setFilter({...filter , xiaomi : !filter.xiaomi})
        }else if(Name == 'samsung'){ setFilter({...filter , samsung : !filter.samsung})
    }
    }
    
    let submitFilter = () => {
        if(isNaN(filter.minPrice || filter.maxPrice)){
           setFilter({...filter , err : 'لطفا در فیلد قیمت عدد وارد کنید'}) 
           return;
        }else if(!isNaN(filter.minPrice && filter.maxPrice)) setFilter({...filter , err : ''})
    }
    return(
    <>
    <div  className="container-padding container padding-custom pb-5">
        <div className="p-lg-5 p-4 text-center  ext-lg-end align-items-center text-white d-flex flex-sm-row flex-column justify-content-between">
            <h1>موبایل های اکبند</h1>
        <div>
            <button className="btn violent-btn mt-4 mt-sm-0 padding-btn d-flex" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                <img src="/pict/filter.png" width={25} height={25}/>فیلتر کردن</button>
            <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
            <div className="offcanvas-header bg-grad">
                <h5 className="offcanvas-title text-white" id="offcanvasWithBothOptionsLabel">برای انتخاب راحت تر فیلتر کنید</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body bg-dark">
                <div>
                    <h5 className="text-white">قیمت</h5>
                    {
                        filter.err ? <h6 className="text-danger">{filter.err}</h6> : null
                    }
                    <div className="d-flex justify-content-around">
                        <input onChange={changehandler} name="minPrice" className=" form-control w-costom__input" placeholder="از"/>
                        <input  onChange={changehandler} name="maxPrice"  className="form-control w-costom__input" placeholder="تا"/>
                    </div>
                </div>
                <hr className="hr-color__costom"/>
                <div>
                    <h5 className="text-white">برند سازنده</h5>
                    <div className="form-check form-switch d-flex justify-content-around align-items-end flex-row-reverse">
                        <input  onClick={changeBrandHandler} className="form-check-input" name="apple" type="checkbox" role="switch" value={filter.apple} id="Apple"/>
                        <label className="h6 px-2 text-white" >Apple</label>
                    </div>
                   <div className="form-check form-switch d-flex justify-content-around align-items-end flex-row-reverse">
                        <input onClick={changeBrandHandler} className="form-check-input" name="samsung" type="checkbox" role="switch" value={filter.samsung} id="Samsung"/>
                        <label className="h6 text-white" >Samsung</label>
                    </div>
                   <div className="form-check form-switch d-flex justify-content-around align-items-end flex-row-reverse">
                        <input onClick={changeBrandHandler} className="form-check-input" name="xiaomi" type="checkbox" role="switch" value={filter.xiaomi} id="Xiaomi"/>
                        <label className="h6 px-2 text-white">xiaomi</label>
                    </div>
                </div>
                <hr className="hr-color__costom"/>
                <div>
                    <h5 className="text-white">رم</h5>
                    <div className="d-flex justify-content-around">
                        <div>
                            <small className="fs-6 text-white">حداقل</small>
                            <select onChange={changehandler} name="minRam" className="form-select" value={filter.minRam}>
                                <option></option>
                                <option value={2}>2</option>
                                <option value={4}>4</option>
                                <option value={6}>6</option>
                                <option value={8}>8</option>
                                <option value={10}>10</option>
                                <option value={12}>12</option>
                            </select>
                        </div>
                        <div>
                            <small className="fs-6 text-white">حداکثر</small>
                            <select onChange={changehandler} name="maxRam" className="form-select" value={filter.maxRam}>
                                <option></option>
                                <option value={2}>2</option>
                                <option value={4}>4</option>
                                <option value={6}>6</option>
                                <option value={8}>8</option>
                                <option value={10}>10</option>
                                <option value={12}>12</option>
                            </select>
                        </div>
                    </div>
                    <hr className="hr-color__costom"/>
                    <h5 className="text-white">حافظه</h5>
                    <div className="d-flex justify-content-around">
                        <div>
                            <small className="fs-6 text-white">حداقل</small>
                            <select onChange={changehandler} name="minMemory" className="form-select" value={filter.minMemory}>
                                <option></option>
                                <option value={32}>32</option>
                                <option value={64}>64</option>
                                <option value={128}>128</option>
                                <option value={256}>256</option>
                                <option value={512}>512</option>
                            </select>
                        </div>
                        <div>
                            <small className="fs-6 text-white">حداکثر</small>
                            <select onChange={changehandler} name="maxMemory" className="form-select" value={filter.maxMemory}>
                                <option></option>
                                <option value={32}>32</option>
                                <option value={64}>64</option>
                                <option value={128}>128</option>
                                <option value={256}>256</option>
                                <option value={512}>512</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="d-grid pt-5">
                    <a data-bs-dismiss="offcanvas"  onClick={submitFilter} className="btn btn-grad">اعمال</a>
                </div>
            </div>
            </div>
        </div>
        </div>
        <div className="cards">
            {
             finalyFilter.map(item => <Card key={item.id} {...item} />) 
            }
        </div> 
        <div className={`d-grid py-5 gap-2 ${showMoreBtn ? '' : 'd-none'}`}>
            <button style={{backgroundColor : '#dd7d00'}} onClick={() => setShowMoreBtn(false)} className="btn btn-lg text-white dropdown-toggle">نمایش تمامی محصولات </button>
        </div>
    </div>
    <Information />
    </>
    )
}