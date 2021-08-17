const Synth2Steps = ( props ) => {

    let final = []
    for( let i = 1; i < 17; i++ ){

        let outerID = "synth2_" + i
        let innerID = "synth2step_" + i

        final.push( <div key={ i } onClick={ props.onClick } id={ outerID } className="block2 col-sm">
                        <div id={ innerID } className="synth2step" >C</div>
                    </div>)
    }

    return(
        <>
            { final }    
        </>
    )
}

export default Synth2Steps