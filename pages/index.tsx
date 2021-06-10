import Head from 'next/head'
import { createRef, useEffect, useState } from 'react'
import { Note, Spacer, Table, Card, CssBaseline, Input, Button, Text } from '@geist-ui/react'

type Result = {
  id: number,
  input: number,
  output: number,
  operation: Function,
}

export default function Home() {
  const [input, setInput] = useState<string>("1000");
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<string>("764");
  const [results, setResults] = useState<Result[]>([]);
  const inputRef = createRef<HTMLInputElement>();

  useEffect(() => {
    if (inputRef.current) { 
      inputRef.current.focus()
    }
  }, [])

  const title = "Hell Let Loose artillery calculator",
        description = "A dead simple calculator for artillery in Hell Let Loose."

  const m = -0.237035714285714,
        b = 1001.46547619048,
        xMin = 100,
        xMax = 1600,
        x = 100,
        y = 978

  const calculate = (point: number) => {
      const x = point;
      if (x >= xMin && x <= xMax) {
          return Math.round(m * x + b)
      } else {
         setError(`Enter a distance between ${xMin} and ${xMax} meters`)
      }
  }

  const operation = (actions, rowData) => {
    return <Button type="error" auto size="mini" onClick={() => {
      actions.remove()
      setResults(results.filter((r) => r.id !== rowData.id))
    }}>Remove</Button>
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    const output = calculate(parseInt(input))

    if (output) {
      setResult(output.toString())
      setError("")
    setResults([{ id: results.length + 1, input: parseInt(input), output, operation }, ...results])
    }
  }

  const onChange = ({ target }) => {
    try {
      setInput(target.value);
    } catch (e) {
      setError("Input must be a number.")
    }
  }

  const handleKeypress = e => {
    if (e.keyCode === 13) {
      onFormSubmit(e);
    }
  };
  

  return (
    <>
       <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="description" content={description}></meta>
        <meta property="og:title" content={title}/>
        <meta property="og:description" content={description}/>

        <meta name="twitter:card" content="summary" key="twcard" />
        {/* <meta name="twitter:creator" content={twitterHandle} key="twhandle" /> */}

        <meta property="og:url" content={""} key="ogurl" />
        {/* <meta property="og:image" content={previewImage} key="ogimage" /> */}
        <meta property="og:site_name" content={title} key="ogsitename" />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
  
        <title>Hell Let Loose artillery calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <CssBaseline />
        <div style={{width: '100vw', height: '100vh'}}>
        <main className="container">
          <div className="input">
            <Card>
              <Text h2>Hell Let Loose Artillery Calculator</Text>
              <form onSubmit={onFormSubmit}>
                <Input autoFocus ref={inputRef} onKeyPress={handleKeypress} value={input} onChange={onChange} width="200px" label="Distance" placeholder="500" clearable />
                <Button onClick={onFormSubmit} type={error ? "error" : "success"} style={{marginLeft: 8}}>Calculate</Button>
              </form>
              {error && <Note label="Error" type="error">{error}</Note>}
            </Card>
          </div>
          <div className="result">
            <Card>
                <Text h2>Result: {result} mil</Text>
            </Card>
          </div>
          <div className="history">
            <Card>
              <Text h3> History </Text>
              <Table data={results}>
                <Table.Column prop="input" label="input (m)" />
                <Table.Column prop="output" label="output (mil)" />
                <Table.Column prop="operation" label="" width={150} />
              </Table>
            </Card>
          </div>
        </main>
        </div>
      <style jsx>{`
        .container {
          display: grid; 
          grid-template-columns: 1fr 1fr 1fr; 
          grid-template-rows: 1fr 1fr 1fr;
          gap: 24px 24px; 
          grid-template-areas: 
            "input input history"
            "result result history"
            "result result history";
          max-width: 1500px;
          max-height: 1500px;
          margin: auto;
          margin-top: 24px;
        }

        @media only screen and (max-width: 1000px) {
          .container {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
            grid-template-areas: 
              "input"
              "result"
              "history";
          }
    
        }
  
        .history { grid-area: history; }
        .input { grid-area: input; }
        .result { grid-area: result; }
      `}</style>
    </>
  )
}
