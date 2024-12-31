import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import {motion} from 'framer-motion'

// ^ -------------------------------------------DONE----------------------------------------------------

const filterData = [
    
    {
        filterType: "Location",
        array: ["Chennai", "pune", "Bengaluru", "Mumbai", "Hyderabad", "Delhi"]
    },
    {
        filterType: "Role",
        array: ["Data Scientist", "Full Stack", "Cloud Solutions Architect" , "Software Engineer", "Cloud Engineer"] 
    },
 
    {
        filterType: "Salary",
        array: ["1 LPA - 2.5 LPA" , "2.5 LPA - 5 LPA" , "5 LPA - 10 LPA" , ]
    }
];

function FilterCard() {

    const [selectedValue , setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    useEffect(() => {
        // console.log(selectedValue);
        dispatch(setSearchedQuery(selectedValue)); //* here we are setting the value of selectedValue to the searchedQuery in the redux store
        
    }, [selectedValue, dispatch]);
    
    return (
        <>
        
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="w-full p-4 overflow-y-auto border border-emerald-500 rounded-lg shadow shadow-2xl h-[80vh]"
            >
                
                <h1 
                     
                     className="text-xl font-bold shadow-2xl text-zinc-800 "
                >
                    Filter Jobs
                </h1>
                <hr className="h-1 my-2 bg-gray-300" />
                
                <div>
                    <RadioGroup value={selectedValue}  onValueChange={changeHandler} >
                        
                        {
                            filterData.map((data, index) => (
                                <div key={index}>
                                    <h1 className='font-medium font-bold'>{data.filterType}</h1>
                                    {
                                        data.array.map((item, idx) => {
                                            const itemId = `id${index}-${idx}`
                                            return (
                                                <div className='flex items-center my-2 space-x-2' key={idx}>
                                                    <RadioGroupItem value={item} id={itemId} />
                                                    <Label htmlFor={itemId}> {item} </Label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ))
                        }
                        
                    </RadioGroup> 
                </div>
                
            </motion.div>
            
        </>
    );
}

export default FilterCard;
