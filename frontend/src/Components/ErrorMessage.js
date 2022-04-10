import React, { Fragment } from 'react'
import {motion} from 'framer-motion'

const ErrorMessage = ({children}) => {
    return (
      <Fragment>
        <motion.div  animate={{x:50}} >
        <motion.p className='text-danger' >{children}</motion.p>
        </motion.div>
      </Fragment>
     
    )
}

export default ErrorMessage
