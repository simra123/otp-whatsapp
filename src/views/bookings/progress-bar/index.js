import { useEffect, useState, React } from "react"
import "react-step-progress-bar/styles.css"
import { ProgressBar, Step } from "react-step-progress-bar"
import './index.scss'
const status = [
  { label: "pending ", value: "0%" },
  { label: "accepted ", value: "10%" },
  { label: "rejected ", value: "20%" },
  { label: "assigned ", value: "30%" },
  { label: "canceled ", value: "40%" },
  { label: "complete ", value: "50%" }
]
const Bar = (props) => {
  console.log(props.state)
  const [percent, setpercent] = useState(20)
  useEffect(() => {
    if (props.state === "Pending") {
      console.log("P")
      setpercent(20)
    } else if (props.state === "Accepted") {
      setpercent(40)
      console.log("A")
    } else if (props.state === "Assigned") {
      setpercent(60)
      console.log("As")
    } else
      if (props.state === "Completed") {
        setpercent(80)
        console.log("c")
      } else
        if (props.state === "Rejected") {
          setpercent(100)
          console.log("R")
        }

  }, [])
  return (
    <>
      <ProgressBar
        percent={percent}
        filledBackground="#025690"
      >
        <Step transition="scale">
          {({ accomplished }) => (
            <div>
              <h4 style={{ border: '1px ', filter: `grayscale(${accomplished ? 0 : 80}%)`, backgroundColor: '#025690', padding: '10px 15px', borderRadius: '50%', color: 'white' }}>1</h4>
            </div>
          )}

        </Step>
        <p className="progress-text  d-md-block">pending</p>

        <Step transition="scale">
          {({ accomplished }) => (
            <div>
              <h4 style={{ border: '1px ', filter: `grayscale(${accomplished ? 0 : 80}%)`, backgroundColor: '#025690', padding: '10px 15px', borderRadius: '50%', color: 'white' }}>2</h4>
            </div>
          )}

        </Step>
        <p className="progress-text  d-md-block">accepted</p>

        <Step transition="scale">
          {({ accomplished }) => (
            <div>
              <h4 style={{ border: '1px ', filter: `grayscale(${accomplished ? 0 : 80}%)`, backgroundColor: '#025690', padding: '10px 15px', borderRadius: '50%', color: 'white' }}>3</h4>
            </div>
          )}

        </Step>
        <p className="progress-text  d-md-block">assigned</p>


        <Step transition="scale">
          {({ accomplished }) => (
            <div>
              <h4 style={{ border: '1px ', filter: `grayscale(${accomplished ? 0 : 80}%)`, backgroundColor: '#025690', padding: '10px 15px', borderRadius: '50%', color: 'white' }}>4</h4>
            </div>
          )}
        </Step>
        <p className="progress-text  d-md-block">completed</p>

        <Step transition="scale">
          {({ accomplished }) => (
            <div>
              <h4 style={{ border: '1px ', filter: `grayscale(${accomplished ? 0 : 80}%)`, backgroundColor: '#025690', padding: '10px 15px', borderRadius: '50%', color: 'white' }}>5</h4>
            </div>
          )}

        </Step>
        <p className="progress-text  d-md-block">Rejected</p>

        {/* <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width="30"
              src="https://orig00.deviantart.net/493a/f/2017/095/5/4/raichu_icon_by_pokemonshuffle_icons-db4ryym.png"
            />
          )}
        </Step> */}
      </ProgressBar>

    </>
  )
}
export default Bar
