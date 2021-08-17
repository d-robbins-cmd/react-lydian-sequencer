const Synth3Steps = ( props ) => {

    let final = []
    for( let i = 1; i < 17; i++ ){

        let outerID = "synth3_" + i
        let innerID = "synth3step_" + i

        final.push( <div key={ i } onClick={ props.onClick } id={ outerID } className="block3 col-sm">
                        <div id={ innerID } className="synth3step">C</div>
                    </div>)
    }

    return(
        <>
            { final }    
        </>
    )
}

export default Synth3Steps