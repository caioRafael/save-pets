import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { FC, useState } from "react";


const OngForm:FC = () => {
    const [name, setName] = useState<string>("")
    return(
        <FormControl
            onSubmit={()=>{console.log(name)}}
        >
            <Input 
                placeholder="Nome" 
                type={"text"} 
                borderColor={"#00B393"}
                value={name}
                onChange={(e: any) => {setName(e.target.value)}}
            />


        </FormControl>
    )
}

export default OngForm