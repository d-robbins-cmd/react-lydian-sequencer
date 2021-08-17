
const Synth1Steps = ( props ) => {

    let final = []
    for( let i = 1; i < 17; i++ ){

        let outerID = "synth1_" + i
        let innerID = "step_" + i

        final.push( <div key={ i } onClick={ props.onClick } id={ outerID } className="block1 col-sm">
                        <div id={ innerID } className="synth1step" >C</div>
                    </div>)
    }

    return(
        <>
            { final }    
        </>
    )
}

export default Synth1Steps