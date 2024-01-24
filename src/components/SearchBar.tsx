 import React from 'react'
 import { FaSearch } from "react-icons/fa";

 type Props = {
    value:string;
    onChange:React.ChangeEventHandler<HTMLInputElement>;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
 }
 
 export default function SearchBar(props: Props) {
   return (
    <form onSubmit={props.onSubmit} 
    className="flex  item-center gap-2 w-full shadow-md focus-within:ring-2 dark:focus-within:ring-gray-200 focus-within:ring-slate-800 p-2 rounded-lg dark:bg-slate-800 bg-white ">
    <section className="flex items-center w-full h-full gap-2 ">
        <FaSearch className='text-2xl mt-2 text-blue-500' />
        <input 
            value={props.value}
            onChange={props.onChange}
            placeholder='Search Github Profile' className="w-full h-[40px] rounded outline-none bg-inherited px-1" type='text'>
        </input> 
        </section>
        <button className='rounded-lg bg-blue-500 px-5 py-2 text-white hover:opacity-80 transition-all'>Search</button>
    </form>
   )
 }