import MenuIcon from '@mui/icons-material/Menu';

function NavigationBurger({handleOpen} : {handleOpen: () => void}) {
    

    return (
        <>
        <div className='block md:hidden self-end' onClick={handleOpen}>
            <MenuIcon />
        </div>
        </>
    );
}

export default NavigationBurger;
