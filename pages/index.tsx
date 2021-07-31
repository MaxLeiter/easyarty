import Head from 'next/head'
import { createRef, useEffect, useState } from 'react'
import { Toggle, GeistProvider, Note, Spacer, Table, Card, CssBaseline, Input, Button, Text } from '@geist-ui/react'

type Result = {
  id: string,
  input: number,
  output: number,
  team: "Axis/Ally" | "Russia",
  operation: Function,
}

export default function Home() {
  const [themeType, setThemeType] = useState('light')
  const [input, setInput] = useState<string>("1000");
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<string>("764");
  const [results, setResults] = useState<Result[]>([]);
  const [russianArty, setRussianArty] = useState<boolean>(false);

  const inputRef = createRef<HTMLInputElement>();

  useEffect(() => {
    if (inputRef.current) { 
      inputRef.current.focus()
    }
  }, [])

  const switchThemes = () => {
    setThemeType(last => (last === 'dark' ? 'light' : 'dark'))
  }

  const title = "Hell Let Loose artillery calculator",
        description = "A dead simple calculator for artillery in Hell Let Loose."


  const xMin = 100,
        xMax = 1600;

  const calculate = (point: number) => {
      let m = russianArty ? -.2136691176 : -0.237035714285714,
      b = russianArty ? 1141.721500 : 1001.46547619048;

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
      // setResults(results.filter((r) => r.id !== rowData.rowValue.id))
    }}>Remove</Button>
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    const output = updateValue();
    if (output > 0)
      setResults([{ id: uuidv4(), input: parseInt(input), output, operation, team: russianArty ? "Russia" : "Axis/Ally"}, ...results])

  }

  const updateValue = (value?: string) => {
    const output = calculate(parseInt(value ? value : input))

    if (output) {
      setResult(output.toString())
      setError("")
      return output;
    }
    return -1;
  }

  const onChange = ({ target }) => {
    try {
      setInput(target.value);
      updateValue(target.value);
    } catch (e) {
      if (input)
        setError("Input must be a number.")
    }
  }

  const onTableChange = (results: Result[]) => {
    setResults(results);
  };

  const handleKeypress = e => {
    if (e.keyCode === 13) {
      onFormSubmit(e);
    }
  };

  const onToggleChange = (e) => {
    setRussianArty(e.target.checked);
    updateValue();
  }

  const onThemeChange = (e) => {
    switchThemes();
  }

  return (
    <GeistProvider themeType={themeType}>
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
              <form onSubmit={onFormSubmit} className="form">
                <span>
                <Input autoFocus ref={inputRef} onKeyPress={handleKeypress} value={input} onChange={onChange} width="200px" label="Distance" placeholder="500" clearable />
                <Button onClick={onFormSubmit} type={error ? "error" : "success"} style={{marginLeft: 8}}>Save</Button>
                </span>
                <span>
                  Russians?
                 <Spacer x={1} inline={true} />
                 <Toggle initialChecked={russianArty} onChange={onToggleChange} size="large" />
                </span>
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
              <Text h3> Saved </Text>
              <Table data={results} onChange={onTableChange}>
                <Table.Column prop="input" label="input (m)" />
                <Table.Column prop="output" label="output (mil)" />
                <Table.Column prop="team" label="team"  />
                <Table.Column prop="operation" label="" />
              </Table>
            </Card>
          </div>

          <footer>
            <div>
                    Dark mode?
                  <Spacer x={1} inline={true} />
                  <Toggle initialChecked={themeType === "dark"} onChange={onThemeChange} size="large" />
            </div>
          </footer>
        </main>

        </div>
      <style jsx global>{`
        .container {
          display: grid; 
          grid-template-columns: 1fr 1fr 1fr; 
          grid-template-rows: 1.2fr 1.2fr 1.2fr .4fr;
          gap: 24px 24px; 
          grid-template-areas: 
            "input input history"
            "result result history"
            "result result history"
            "footer footer footer";
          max-width: 1500px;
          max-height: 1500px;
          margin: auto;
          margin-top: 24px;
        }

        .form {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        @media only screen and (max-width: 1000px) {
          .container {
            margin: 8px;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
            grid-template-areas: 
              "input"
              "result"
              "history"
              "footer";
          }

          .form {
            display: flex;
            flex-direction: column;
            height: 150px;
          }

          .form span {
            display: flex;
          }
    
        }
  
        .history { grid-area: history; }
        .input { grid-area: input; }
        .result { grid-area: result; }
        footer { grid-area: footer; }
      `}</style>
    </GeistProvider>
  )
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
