// material-ui
import { Box } from '@mui/material';

// project import
import DrawerContent from './DrawerContent';
import MiniDrawerStyled from './MiniDrawerStyled';

// ==============================|| MAIN LAYOUT - DRAWER ||============================== //

const MainDrawer = () => {
    return (
        <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1300 }} aria-label="mailbox folders">
            <MiniDrawerStyled variant="permanent" open={true}>
                <DrawerContent />
            </MiniDrawerStyled>
        </Box>
    );
};

export default MainDrawer;
