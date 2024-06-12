// todo: need a test for this
import React, {useEffect} from "react";


// TODO this validation needs to ignore new lines
export function isValidEquation(v: string) {
    const reg = new RegExp(/^[\d\\+\-*\/ \(\)\.]+$/);
    // const reg = new RegExp(/^([\d+\\+//-//*/])+$/);
    return reg.test(v)
}

export function Answer(props: { aValue: string }) {
    useEffect(() => {


        console.log('useEffect logic ran props are ' + props.aValue);
    }); //

    console.log("value is :" + props.aValue);
    return (
        <h1>answer: {props.aValue}</h1>
    )
}


export default function MyForm() {
    const [value, setValue] = React.useState('');

    const [answer, setAnswer] = React.useState('Answer will appear here');

    async function handleSubmit(e: any) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

        // set no-cors to make local testing easier. In real life we'd have a proxy or some other more secure setup
        const payload = {
            input: value
        }


        fetch('http://localhost:3000/eval/',
            {
                method: form.method, body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                // mode: "no-cors"
            }
        ).then(r => {
            if (!r.ok) {
                //TODO: push the error message into the payload
                console.log(r.statusText)
                setAnswer("there was a error: " + r.statusText)
                console.log(r.status)
                throw new Error("Network response was not OK");
            }
            return r.json()
        }).then(d => {
            console.log("json")
            console.log(d)
            return  d

        }).then(data =>{
            console.log("setting answer data:",  data.answer);

            console.log(data.answer)
            setAnswer(data.answer)
        }

        )


    }

    function onChange(e: any) {
        const v = e.target.value;
        if (/^\s*$/.test(v)) {
            return
        }
        console.log("testing " + v)
        if (!isValidEquation(v)) {
            alert("Please enter a valid number");
            //TODO: Do we want to clear the box after?
        }
        // check length
        setValue(v)

    }

    return (
        <>

            <Answer aValue={answer}/>
            <form method="post" onSubmit={handleSubmit}>
                <label>
                    Text input: <textarea name="input" placeholder="Enter an equation to solve"
                                          onChange={onChange}/>
                </label>
                <hr/>

                <button type="submit">Submit form</button>
            </form>
        </>
    );
}