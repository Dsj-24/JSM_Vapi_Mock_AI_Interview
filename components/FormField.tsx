import React from 'react'
import { FormItem, FormLabel, FormControl,FormMessage } from './ui/form'
import { Input } from './ui/input';
import { Control, Controller,FieldValues, Path } from 'react-hook-form'


interface FormFieldProps<T extends FieldValues>{
control: Control<T>;
name: Path<T>;
label: string;
placeholder? : string;
type?: 'text' | 'email' | 'password' | 'file'

}


const FormField = <T extends FieldValues> ({control,name,label,placeholder,type="text"}:FormFieldProps<T>) => (
  
   <Controller render={({field})=>(

      <FormItem>
              <FormLabel className='label'>{label}</FormLabel>
              <FormControl>
                <Input className='input' placeholder={placeholder} type={type} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
   )} name={name} control={control}
          
          
        />
  )


export default FormField;