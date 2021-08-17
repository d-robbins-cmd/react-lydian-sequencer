import React, { useEffect } from 'react'
import * as Tone from 'tone'
import Synth1Steps from './Synth1Steps'
import Synth2Steps from './Synth2Steps'
import Synth3Steps from './Synth3Steps'


let synth1, synth2, synth3
let counter, loopBeat
let transport = Tone.Transport
let delay1, delay2, delay3
let reverb, autoPanner
let C_LYDIAN_SCALE = ['C', 'D', 'E', 'F#', 'G', 'A', 'B']
const SYNTH1_SELECTED_COLOR = '#82BA86' 
const SYNTH1_ORIGINAL_COLOR = '#A7D6AA'  
const SYNTH2_SELECTED_COLOR = '#ABCE9A'
const SYNTH2_ORIGINAL_COLOR = '#D3F0C5'
const SYNTH3_SELECTED_COLOR = '#DDDFA9'
const SYNTH3_ORIGINAL_COLOR = '#FEFFD6'
const SYNTH1_DURATION = '16n'
const SYNTH2_DURATION = '16n'
const SYNTH3_DURATION = '16n'
const synth1_on = true
const synth2_on = true
const synth3_on = true

const synth1Blocks = document.getElementsByClassName( 'block1' )
const synth2Blocks = document.getElementsByClassName( 'block2' )
const synth3Blocks = document.getElementsByClassName( 'block3' ) 

let sequence1 = new Array( 16 )
let sequence2 = new Array( 16 )
let sequence3 = new Array( 16 )
  

    const Sequencer = () => {

        useEffect(() => {            
            setOrigColor()
            setup()
        })

        const setup = () => {

            for ( let i = 0; i < sequence1.length; i++ ){
                sequence1[ i ] = 'C'
                sequence2[ i ] = 'C'
                sequence3[ i ] = 'C'
            }

            counter = 0

            synth1 = new Tone.Synth({
                "volume": -100
            }).toDestination()

            synth2 = new Tone.MonoSynth({
                'oscillator':{
                    'type': 'sine'
                },
                'volume': -100
            }).toDestination()

            synth3 = new Tone.Synth({
                "volume": -100
            }).toDestination()

            delay1 = new Tone.Delay().toDestination()
            delay2 = new Tone.Delay().toDestination()
            delay3 = new Tone.Delay().toDestination()

            reverb = new Tone.Reverb({
                "decay": 10
            }).toDestination()

            autoPanner = new Tone.AutoPanner("4n").toDestination().start()

            loopBeat = new Tone.Loop( song, '8n' )
            transport.bpm.value = 90
        }

        const getID = str => {
            return str.split('_')[1]  
        }

        const togglePanner = e => {
            const pannerBtn = document.getElementById( 'togglePanner' )
            if ( e.target.value === "off" ){
                synth1.connect( autoPanner )
                synth3.connect( autoPanner )
                pannerBtn.value = 'on'
                pannerBtn.innerText = 'panner on'
            } else {
                synth1.disconnect( autoPanner )
                synth1.toDestination()
                synth3.disconnect( autoPanner )
                synth3.toDestination()
                pannerBtn.value = 'off'
                pannerBtn.innerText = 'panner off'
            }
        }

        const toggleSequence = e => {
            e.preventDefault()
            const sequenceBtn = document.getElementById( 'toggleSequence' )
            if ( e.target.value === "off" ){
                transport.start() 
                loopBeat.start( 0 )
                sequenceBtn.value = "on"
                sequenceBtn.innerText = "sequencer on"   
            } else {
                transport.stop() 
                loopBeat.stop()
                sequenceBtn.value = "off"
                sequenceBtn.innerText = "sequencer off"
            }
        }

        const toggleReverb = e => {
            const reverbBtn = document.getElementById( 'toggleReverb' )
            if ( e.target.value === 'off' ){
                synth1.connect( reverb )
                synth3.connect( reverb )
                reverbBtn.value = 'on'
                reverbBtn.innerText = 'reverb on'
            } else {
                synth1.disconnect( reverb )
                synth1.toDestination()
                synth3.disconnect( reverb )
                synth3.toDestination()
                reverbBtn.value = 'off'
                reverbBtn.innerText = 'reverb off'
            }
        }

        const delay_on = ( e ) => {        
            const whichSynth = getID( e.target.id )          
            if ( whichSynth === '1' ){ synth1.connect( delay1 )}
            if ( whichSynth === '2' ){ synth2.connect( delay2 )}
            if ( whichSynth === '3' ){ synth3.connect( delay3 )}
        }

        const delay_off = ( e ) => {
            const whichSynth = e.target.id.split('_')[1]
            if ( whichSynth === '1' ){ synth1.disconnect( delay1 ); synth1.toDestination()}
            if ( whichSynth === '2' ){ synth2.disconnect( delay2 ); synth2.toDestination()}
            if ( whichSynth === '3' ){ synth3.disconnect( delay3 ); synth3.toDestination()}
        }

        const song = ( time ) => {

            const synth1Elements = document.getElementsByClassName( 'block1' )
            const synth2Elements = document.getElementsByClassName( 'block2' )
            const synth3Elements = document.getElementsByClassName( 'block3' )
            
            if ( counter === 0 ){

                if ( synth1_on ){
                    synth1.triggerAttackRelease( addOctaveString( sequence1[0], 4 ), SYNTH1_DURATION, time, 1 )
                    synth1Elements[ 0 ].style.backgroundColor = SYNTH1_SELECTED_COLOR
                    synth1Elements[ 15 ].style.backgroundColor = SYNTH1_ORIGINAL_COLOR
                }
            
                if ( synth2_on ){
                    synth2.triggerAttackRelease( addOctaveString( sequence2[0], 3 ), SYNTH2_DURATION, time, 1 )
                    synth2Elements[0].style.backgroundColor = SYNTH2_SELECTED_COLOR
                    synth2Elements[15].style.backgroundColor = SYNTH2_ORIGINAL_COLOR
                }

                if ( synth3_on ){
                    synth3.triggerAttackRelease( addOctaveString( sequence3[0], 5 ), SYNTH3_DURATION, time, 1 )
                    synth3Elements[0].style.backgroundColor = SYNTH3_SELECTED_COLOR
                    synth3Elements[15].style.backgroundColor = SYNTH3_ORIGINAL_COLOR
                }
              
            }
            if ( counter === 1 ){
                if ( synth1_on ){
                    synth1.triggerAttackRelease( addOctaveString( sequence1[1], 4 ), SYNTH1_DURATION, time, 1 )
                    synth1Elements[1].style.backgroundColor = SYNTH1_SELECTED_COLOR
                    synth1Elements[0].style.backgroundColor = SYNTH1_ORIGINAL_COLOR
                }
           
                if ( synth2_on ){
                    synth2.triggerAttackRelease( addOctaveString( sequence2[1], 3 ), SYNTH2_DURATION, time, 1 )
                    synth2Elements[1].style.backgroundColor = SYNTH2_SELECTED_COLOR
                    synth2Elements[0].style.backgroundColor = SYNTH2_ORIGINAL_COLOR
                }
                if ( synth3_on ){
                    synth3.triggerAttackRelease( addOctaveString( sequence3[1], 5 ), SYNTH3_DURATION, time, 1 )
                    synth3Elements[1].style.backgroundColor = SYNTH3_SELECTED_COLOR
                    synth3Elements[0].style.backgroundColor = SYNTH3_ORIGINAL_COLOR
                }
            
            }
            if ( counter === 2 ){
                if ( synth1_on ){
                    synth1.triggerAttackRelease( addOctaveString( sequence1[2], 4 ), SYNTH1_DURATION, time, 1 )
                    synth1Elements[2].style.backgroundColor = SYNTH1_SELECTED_COLOR
                    synth1Elements[1].style.backgroundColor = SYNTH1_ORIGINAL_COLOR
                }
               
                if ( synth2_on ){
                    synth2.triggerAttackRelease( addOctaveString( sequence2[2], 3 ), SYNTH2_DURATION, time, 1 )
                    synth2Elements[2].style.backgroundColor = SYNTH2_SELECTED_COLOR
                    synth2Elements[1].style.backgroundColor = SYNTH2_ORIGINAL_COLOR
                }
                if ( synth3_on ){
                    synth3.triggerAttackRelease( addOctaveString( sequence3[2], 5 ), SYNTH3_DURATION, time, 1 )
                    synth3Elements[2].style.backgroundColor = SYNTH3_SELECTED_COLOR
                    synth3Elements[1].style.backgroundColor = SYNTH3_ORIGINAL_COLOR
                }
                
            }
            if ( counter === 3 ){
                if ( synth1_on ){
                    synth1.triggerAttackRelease( addOctaveString( sequence1[3], 4 ), SYNTH1_DURATION, time, 1 )
                    synth1Elements[3].style.backgroundColor = SYNTH1_SELECTED_COLOR
                    synth1Elements[2].style.backgroundColor = SYNTH1_ORIGINAL_COLOR
                }
           
                if ( synth2_on ){
                    synth2.triggerAttackRelease( addOctaveString( sequence2[3], 3 ), SYNTH2_DURATION, time, 1 )
                    synth2Elements[3].style.backgroundColor = SYNTH2_SELECTED_COLOR
                    synth2Elements[2].style.backgroundColor = SYNTH2_ORIGINAL_COLOR
                }
                if ( synth3_on ){
                    synth3.triggerAttackRelease( addOctaveString( sequence3[3], 5 ), SYNTH3_DURATION, time, 1 )
                    synth3Elements[3].style.backgroundColor = SYNTH3_SELECTED_COLOR
                    synth3Elements[2].style.backgroundColor = SYNTH3_ORIGINAL_COLOR
                }
            
            }
            if ( counter === 4 ){
                if ( synth1_on ){
                    synth1.triggerAttackRelease( addOctaveString( sequence1[4], 4 ), SYNTH1_DURATION, time, 1 )
                    synth1Elements[4].style.backgroundColor = SYNTH1_SELECTED_COLOR
                    synth1Elements[3].style.backgroundColor = SYNTH1_ORIGINAL_COLOR
                }
       
                if ( synth2_on ){
                    synth2.triggerAttackRelease( addOctaveString( sequence2[4], 3 ), SYNTH2_DURATION, time, 1 )
                    synth2Elements[4].style.backgroundColor = SYNTH2_SELECTED_COLOR
                    synth2Elements[3].style.backgroundColor = SYNTH2_ORIGINAL_COLOR
                }
                if ( synth3_on ){
                    synth3.triggerAttackRelease( addOctaveString( sequence3[4], 5 ), SYNTH3_DURATION, time, 1 )
                    synth3Elements[4].style.backgroundColor = SYNTH3_SELECTED_COLOR
                    synth3Elements[3].style.backgroundColor = SYNTH3_ORIGINAL_COLOR
                }
              
            }
            if ( counter === 5 ){
                if ( synth1_on ){
                    synth1.triggerAttackRelease( addOctaveString( sequence1[5], 4 ), SYNTH1_DURATION, time, 1 )
                    synth1Elements[5].style.backgroundColor = SYNTH1_SELECTED_COLOR
                    synth1Elements[4].style.backgroundColor = SYNTH1_ORIGINAL_COLOR
                }
           
                if ( synth2_on ){
                    synth2.triggerAttackRelease( addOctaveString( sequence2[5], 3 ), SYNTH2_DURATION, time, 1 )
                    synth2Elements[5].style.backgroundColor = SYNTH2_SELECTED_COLOR
                    synth2Elements[4].style.backgroundColor = SYNTH2_ORIGINAL_COLOR
                }
                if ( synth3_on ){
                    synth3.triggerAttackRelease( addOctaveString( sequence3[5], 5 ), SYNTH3_DURATION, time, 1 )
                    synth3Elements[5].style.backgroundColor = SYNTH3_SELECTED_COLOR
                    synth3Elements[4].style.backgroundColor = SYNTH3_ORIGINAL_COLOR
                }
                
            }
            if ( counter === 6 ){
                if ( synth1_on ){
                    synth1.triggerAttackRelease( addOctaveString( sequence1[6], 4 ), SYNTH1_DURATION, time, 1 )
                    synth1Elements[6].style.backgroundColor = SYNTH1_SELECTED_COLOR
                    synth1Elements[5].style.backgroundColor = SYNTH1_ORIGINAL_COLOR
                }

                if ( synth2_on ){
                    synth2.triggerAttackRelease( addOctaveString( sequence2[6], 3 ), SYNTH2_DURATION, time, 1 )
                    synth2Elements[6].style.backgroundColor = SYNTH2_SELECTED_COLOR
                    synth2Elements[5].style.backgroundColor = SYNTH2_ORIGINAL_COLOR
                }
                if ( synth3_on ){
                    synth3.triggerAttackRelease( addOctaveString( sequence3[6], 5 ), SYNTH3_DURATION, time, 1 )
                    synth3Elements[6].style.backgroundColor = SYNTH3_SELECTED_COLOR
                    synth3Elements[5].style.backgroundColor = SYNTH3_ORIGINAL_COLOR
                }
               
            }
            if ( counter === 7 ){
                if ( synth1_on ){
                    synth1.triggerAttackRelease( addOctaveString( sequence1[7], 4 ), SYNTH1_DURATION, time, 1 )
                    synth1Elements[7].style.backgroundColor = SYNTH1_SELECTED_COLOR
                    synth1Elements[6].style.backgroundColor = SYNTH1_ORIGINAL_COLOR
                }
       
                if ( synth2_on ){
                    synth2.triggerAttackRelease( addOctaveString( sequence2[7], 3 ), SYNTH2_DURATION, time, 1 )
                    synth2Elements[7].style.backgroundColor = SYNTH2_SELECTED_COLOR
                    synth2Elements[6].style.backgroundColor = SYNTH2_ORIGINAL_COLOR
                }
                if ( synth3_on ){
                    synth3.triggerAttackRelease( addOctaveString( sequence3[7], 5 ), SYNTH3_DURATION, time, 1 )
                    synth3Elements[7].style.backgroundColor = SYNTH3_SELECTED_COLOR
                    synth3Elements[6].style.backgroundColor = SYNTH3_ORIGINAL_COLOR
                }
              
            }
            if ( counter === 8 ){
                if ( synth1_on ){
                    synth1.triggerAttackRelease( addOctaveString( sequence1[8], 4 ), SYNTH1_DURATION, time, 1 )
                    synth1Elements[8].style.backgroundColor = SYNTH1_SELECTED_COLOR
                    synth1Elements[7].style.backgroundColor = SYNTH1_ORIGINAL_COLOR
                }
   
                if ( synth2_on ){
                    synth2.triggerAttackRelease( addOctaveString( sequence2[8], 3 ), SYNTH2_DURATION, time, 1 )
                    synth2Elements[8].style.backgroundColor = SYNTH2_SELECTED_COLOR
                    synth2Elements[7].style.backgroundColor = SYNTH2_ORIGINAL_COLOR
                }
                if ( synth3_on ){
                    synth3.triggerAttackRelease( addOctaveString( sequence3[8], 5 ), SYNTH3_DURATION, time, 1 )
                    synth3Elements[8].style.backgroundColor = SYNTH3_SELECTED_COLOR
                    synth3Elements[7].style.backgroundColor = SYNTH3_ORIGINAL_COLOR
                }
                
            }
            if ( counter === 9 ){
                if ( synth1_on ){
                    synth1.triggerAttackRelease( addOctaveString( sequence1[9], 4 ), SYNTH1_DURATION, time, 1 )
                    synth1Elements[9].style.backgroundColor = SYNTH1_SELECTED_COLOR
                    synth1Elements[8].style.backgroundColor = SYNTH1_ORIGINAL_COLOR
                }
            
                if ( synth2_on ){
                    synth2.triggerAttackRelease( addOctaveString( sequence2[9], 3 ), SYNTH2_DURATION, time, 1 )
                    synth2Elements[9].style.backgroundColor = SYNTH2_SELECTED_COLOR
                    synth2Elements[8].style.backgroundColor = SYNTH2_ORIGINAL_COLOR
                }
                if ( synth3_on ){
                    synth3.triggerAttackRelease( addOctaveString( sequence3[9], 5 ), SYNTH3_DURATION, time, 1 )
                    synth3Elements[9].style.backgroundColor = SYNTH3_SELECTED_COLOR
                    synth3Elements[8].style.backgroundColor = SYNTH3_ORIGINAL_COLOR
                }
               
            }
            if ( counter === 10 ){
                if ( synth1_on ){
                    synth1.triggerAttackRelease( addOctaveString( sequence1[10], 4 ), SYNTH1_DURATION, time, 1 )
                    synth1Elements[10].style.backgroundColor = SYNTH1_SELECTED_COLOR
                    synth1Elements[9].style.backgroundColor = SYNTH1_ORIGINAL_COLOR
                }
             
                if ( synth2_on ){
                    synth2.triggerAttackRelease( addOctaveString( sequence2[10], 3 ), SYNTH2_DURATION, time, 1 )
                    synth2Elements[10].style.backgroundColor = SYNTH2_SELECTED_COLOR
                    synth2Elements[9].style.backgroundColor = SYNTH2_ORIGINAL_COLOR
                }
                if ( synth3_on ){
                    synth3.triggerAttackRelease( addOctaveString( sequence3[10], 5 ), SYNTH3_DURATION, time, 1 )
                    synth3Elements[10].style.backgroundColor = SYNTH3_SELECTED_COLOR
                    synth3Elements[9].style.backgroundColor = SYNTH3_ORIGINAL_COLOR
                }
                
            }
            if ( counter === 11 ){
                if ( synth1_on ){
                    synth1.triggerAttackRelease( addOctaveString( sequence1[11], 4 ), SYNTH1_DURATION, time, 1 )
                    synth1Elements[11].style.backgroundColor = SYNTH1_SELECTED_COLOR
                    synth1Elements[10].style.backgroundColor = SYNTH1_ORIGINAL_COLOR
                }
               
                if ( synth2_on ){
                    synth2.triggerAttackRelease( addOctaveString( sequence2[11], 3 ), SYNTH2_DURATION, time, 1 )
                    synth2Elements[11].style.backgroundColor = SYNTH2_SELECTED_COLOR
                    synth2Elements[10].style.backgroundColor = SYNTH2_ORIGINAL_COLOR
                }
                if ( synth3_on ){
                    synth3.triggerAttackRelease( addOctaveString( sequence3[11], 5 ), SYNTH3_DURATION, time, 1 )
                    synth3Elements[11].style.backgroundColor = SYNTH3_SELECTED_COLOR
                    synth3Elements[10].style.backgroundColor = SYNTH3_ORIGINAL_COLOR
                }
       
            }
            if ( counter === 12 ){
                if ( synth1_on ){
                    synth1.triggerAttackRelease( addOctaveString( sequence1[12], 4 ), SYNTH1_DURATION, time, 1 )
                    synth1Elements[12].style.backgroundColor = SYNTH1_SELECTED_COLOR
                    synth1Elements[11].style.backgroundColor = SYNTH1_ORIGINAL_COLOR
                }
               
                if ( synth2_on ){
                    synth2.triggerAttackRelease( addOctaveString( sequence2[12], 3 ), SYNTH2_DURATION, time, 1 )
                    synth2Elements[12].style.backgroundColor = SYNTH2_SELECTED_COLOR
                    synth2Elements[11].style.backgroundColor = SYNTH2_ORIGINAL_COLOR
                }
                if ( synth3_on ){
                    synth3.triggerAttackRelease( addOctaveString( sequence3[12], 5 ), SYNTH3_DURATION, time, 1 )
                    synth3Elements[12].style.backgroundColor = SYNTH3_SELECTED_COLOR
                    synth3Elements[11].style.backgroundColor = SYNTH3_ORIGINAL_COLOR
                }
             
            }
            if ( counter === 13 ){
                if ( synth1_on ){
                    synth1.triggerAttackRelease( addOctaveString( sequence1[13], 4 ), SYNTH1_DURATION, time, 1 )
                    synth1Elements[13].style.backgroundColor = SYNTH1_SELECTED_COLOR
                    synth1Elements[12].style.backgroundColor = SYNTH1_ORIGINAL_COLOR
                }
             
                if ( synth2_on ){
                    synth2.triggerAttackRelease( addOctaveString( sequence2[13], 3 ), SYNTH2_DURATION, time, 1 )
                    synth2Elements[13].style.backgroundColor = SYNTH2_SELECTED_COLOR
                    synth2Elements[12].style.backgroundColor = SYNTH2_ORIGINAL_COLOR
                }
                if ( synth3_on ){
                    synth3.triggerAttackRelease( addOctaveString( sequence3[13], 5 ), SYNTH3_DURATION, time, 1 )
                    synth3Elements[13].style.backgroundColor = SYNTH3_SELECTED_COLOR
                    synth3Elements[12].style.backgroundColor = SYNTH3_ORIGINAL_COLOR
                }
            
            }
            if ( counter === 14 ){
                if ( synth1_on ){
                    synth1.triggerAttackRelease( addOctaveString( sequence1[14], 4 ), SYNTH1_DURATION, time, 1 )
                    synth1Elements[14].style.backgroundColor = SYNTH1_SELECTED_COLOR
                    synth1Elements[13].style.backgroundColor = SYNTH1_ORIGINAL_COLOR
                }
        
                if ( synth2_on ){
                    synth2.triggerAttackRelease( addOctaveString( sequence2[14], 3 ), SYNTH2_DURATION, time, 1 )
                    synth2Elements[14].style.backgroundColor = SYNTH2_SELECTED_COLOR
                    synth2Elements[13].style.backgroundColor = SYNTH2_ORIGINAL_COLOR
                }
                if ( synth3_on ){
                    synth3.triggerAttackRelease( addOctaveString( sequence3[14], 5 ), SYNTH3_DURATION, time, 1 )
                    synth3Elements[14].style.backgroundColor = SYNTH3_SELECTED_COLOR
                    synth3Elements[13].style.backgroundColor = SYNTH3_ORIGINAL_COLOR
                }
   
            }
            if ( counter === 15 ){
                if ( synth1_on ){
                    synth1.triggerAttackRelease( addOctaveString( sequence1[15], 4 ), SYNTH1_DURATION, time, 1 )
                    synth1Elements[15].style.backgroundColor = SYNTH1_SELECTED_COLOR
                    synth1Elements[14].style.backgroundColor = SYNTH1_ORIGINAL_COLOR
                }
             
                if ( synth2_on ){
                    synth2.triggerAttackRelease( addOctaveString( sequence2[15], 3 ), SYNTH2_DURATION, time, 1 )
                    synth2Elements[15].style.backgroundColor = SYNTH2_SELECTED_COLOR
                    synth2Elements[14].style.backgroundColor = SYNTH2_ORIGINAL_COLOR
                }
                if ( synth3_on ){
                    synth3.triggerAttackRelease( addOctaveString( sequence3[15], 5 ), SYNTH3_DURATION, time, 1 )
                    synth3Elements[15].style.backgroundColor = SYNTH3_SELECTED_COLOR
                    synth3Elements[14].style.backgroundColor = SYNTH3_ORIGINAL_COLOR
                }
               
            }

            counter = ( counter + 1 ) % 16
        }
  
        const setOrigColor = () => {
            for( let i = 0; i < 16; i++ ){
                synth1Blocks[i].style.backgroundColor = SYNTH1_ORIGINAL_COLOR
                synth2Blocks[i].style.backgroundColor = SYNTH2_ORIGINAL_COLOR
                synth3Blocks[i].style.backgroundColor = SYNTH3_ORIGINAL_COLOR
            }
           
        }

        const addOctaveString = ( note, octave ) => {
            return note + octave
        }

        const synth1_randomNote = e => {
            let step = e.target.id.split('_')[1]
            let note = C_LYDIAN_SCALE[ Math.floor( Math.random() * C_LYDIAN_SCALE.length ) ]
            sequence1[ step - 1 ] = note
            document.getElementById( e.target.id ).childNodes[0].innerText = note
        }

        const synth2_randomNote = e => {
            let step = e.target.id.split('_')[1]
            let note = C_LYDIAN_SCALE[ Math.floor( Math.random() * C_LYDIAN_SCALE.length ) ]
            sequence2[ step - 1 ] = note
            document.getElementById( e.target.id ).childNodes[0].innerText = note
        }

        const synth3_randomNote = e => {
            let step = e.target.id.split('_')[1]
            let note = C_LYDIAN_SCALE[ Math.floor( Math.random() * C_LYDIAN_SCALE.length ) ]
            sequence3[ step - 1 ] = note
            document.getElementById( e.target.id ).childNodes[0].innerText = note
        }

        const synth1_reset = () => {      
            let theseBlocks = document.getElementsByClassName( 'synth1step' )
            for ( let i = 0; i < theseBlocks.length; i++ ){
                sequence1[ i ] = 'C'
                theseBlocks[i].textContent = 'C'
            }
        }

        const synth2_reset = () => {   
            let theseBlocks = document.getElementsByClassName( 'synth2step' )   
            for ( let i = 0; i < theseBlocks.length; i++ ){
                sequence2[ i ] = 'C'    
                theseBlocks[i].textContent = 'C'
            }
        }

        const synth3_reset = () => {    
            let theseBlocks = document.getElementsByClassName( 'synth3step' )  
            for ( let i = 0; i < theseBlocks.length; i++ ){
                sequence3[ i ] = 'C'
                theseBlocks[i].textContent = 'C'
            }
        }

        const delay_toggle = e => {

            const elem = document.getElementById( e.target.id )

            if ( e.target.value === 'off' ){ 
                elem.value = 'on'
                elem.innerText = 'delay on'
                delay_on( e ) 
            }
            else { 
                elem.value = 'off' 
                elem.innerText = 'delay off'
                delay_off( e )
            }

        }

        const set_delay_time = e => {   
            const id = getID( e.target.id ) 
            const value = e.target.value
            if ( id === '1' ){ delay1.set({ delayTime: value }) }
            if ( id === '2' ){ delay2.set({ delayTime: value }) }
            if ( id === '3' ){ delay3.set({ delayTime: value }) }
        }

        const synth_start = e => {
            const id = getID( e.target.id )
            if ( id === '1' ){ synth1.set({ "volume": -10 })}
            if ( id === '2' ){ synth2.set({ "volume": -15 })}
            if ( id === '3' ){ synth3.set({ "volume": -15 })}
        }

        const synth_stop = e => {
            const id = getID( e.target.id )
            if ( id === '1' ){ synth1.set({ "volume": -100 })}
            if ( id === '2' ){ synth2.set({ "volume": -100 })}
            if ( id === '3' ){ synth3.set({ "volume": -100 })}
        }

        const onOff_toggle = e => {

            const elem = document.getElementById( e.target.id )
            
            if ( e.target.value === 'off' ){ 
                synth_start( e )
                elem.value = 'on'
                elem.innerText = 'synth on'
            }
            
            else { 
                synth_stop( e )
                elem.value = 'off' 
                elem.innerText = 'synth off'
            }
        }

        const randomize_sequence = e => {

            const id = getID( e.target.id )

            if ( id === '1' ){ 
                let theseBlocks = document.getElementsByClassName( 'synth1step' )
                for ( let i = 0; i < theseBlocks.length; i++ ){  
                   sequence1[ i ] = C_LYDIAN_SCALE[ Math.floor( Math.random() * C_LYDIAN_SCALE.length ) ]  
                   theseBlocks[ i ].textContent = sequence1[ i ]
                }                 
            }

            if ( id === '2' ){ 
                let theseBlocks = document.getElementsByClassName( 'synth2step' )
                for ( let i = 0; i < theseBlocks.length; i++ ){  
                   sequence2[ i ] = C_LYDIAN_SCALE[ Math.floor( Math.random() * C_LYDIAN_SCALE.length ) ]   
                   theseBlocks[i].textContent = sequence2[ i ]
                }                 
            }
            if ( id === '3' ){ 
                let theseBlocks = document.getElementsByClassName( 'synth3step' )
                for ( let i = 0; i < theseBlocks.length; i++ ){  
                   sequence3[ i ] = C_LYDIAN_SCALE[ Math.floor( Math.random() * C_LYDIAN_SCALE.length ) ]  
                   theseBlocks[i].textContent = sequence3[ i ]
                }               
            }
        }

        
        return(
            <>

            <div className="container">
           
                <div className="sequencer-wrapper">         
    
                    <h3 className="text-center">c lydian sequencer</h3>

                    <p className="text-center"> 
                        Turn the sequencer on, then each synth, then have fun.  Reverb and Panning effect is global.  Delay is not.
                    </p>
            
                    <div className="text-center d-grid d-sm-block gap-2">
                       
                        <button id="toggleSequence" value="off" type="button" onClick={ toggleSequence } className="btn btn-secondary btn-sm">sequencer off</button>
                        <button id="toggleReverb" value="off" type="button" onClick={ toggleReverb } className="btn btn-secondary btn-sm">reverb off</button>
                        <button id="togglePanner" value="off" type="button" onClick={ togglePanner } className="btn btn-secondary btn-sm">panner off</button>
                    
                    </div>

                </div>
                 
                
                    <section className="synth-wrapper text-center mt-4 w-100">

                        <div className="d-flex">
                            <Synth1Steps onClick={ synth1_randomNote }></Synth1Steps>
                        </div>
                        
                        <div className="mt-3">
                            <button value="off" id="volume_1" onClick={ onOff_toggle } type="button" className="btn btn-secondary btn-sm">synth off</button>
                            <button value="off" id="delay_1" onClick={ delay_toggle } type="button" className="btn btn-secondary btn-sm">delay off</button>
                            <button id="random_1" onClick={ randomize_sequence } type="button" className="btn btn-secondary btn-sm">randomize</button>
                            <button id="synth1_reset" onClick={ synth1_reset } type="button" className="btn btn-secondary btn-sm">reset</button>
                            <div className="delayDiv mt-3">
                                <input id="delayTime_1" onChange={ set_delay_time } type="range" min="0.1" max="1" step="0.1" className="slider"/><br/>
                                delay time
                            </div>    
                        </div>
                        
                    </section>

                    <section className="synth-wrapper text-center mt-4 w-100">
                        <div className="d-flex">
                            <Synth2Steps onClick={ synth2_randomNote }></Synth2Steps>
                        </div>
                        <div className="mt-3">
                                <button value="off" id="volume_2" onClick={ onOff_toggle } type="button" className="btn btn-secondary btn-sm">synth off</button>
                                <button value="off" id="delay_2" onClick={ delay_toggle } type="button" className="btn btn-secondary btn-sm">delay off</button>
                                <button id="random_2" onClick={ randomize_sequence } type="button" className="btn btn-secondary btn-sm">randomize</button>
                                <button id="synth2_reset" onClick={ synth2_reset } type="button" className="btn btn-secondary btn-sm">reset</button> 
                                <div className="delayDiv mt-3">
                                    <input id="delayTime_2" onChange={ set_delay_time } type="range" min="0.1" max="1" step="0.1" className="slider"/><br/>
                                    delay time
                                </div> 
                        </div>
                    </section>                  

                    <section className="synth-wrapper text-center mt-4 w-100">
                    <div className="d-flex">
                            <Synth3Steps onClick={ synth3_randomNote }></Synth3Steps>   
                        </div>
                        <div className="mt-3">
                            <button value="off" id="volume_3" onClick={ onOff_toggle } type="button" className="btn btn-secondary btn-sm">synth off</button>
                            <button value="off" id="delay_3" onClick={ delay_toggle } type="button" className="btn btn-secondary btn-sm">delay off</button>
                            <button id="random_3" onClick={ randomize_sequence } type="button" className="btn btn-secondary btn-sm">randomize</button>
                            <button id="synth3_reset" onClick={ synth3_reset } type="button" className="btn btn-secondary btn-sm">reset</button>  
                            <div className="delayDiv mt-3">
                                <input id="delayTime_3" onChange={ set_delay_time } type="range" min="0.1" max="1" step="0.1" className="slider"/><br/>
                                delay time
                            </div>
                                  
                        </div> 
                    </section>                
 
            </div>

            </>
        )
}

export default Sequencer