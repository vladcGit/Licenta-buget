// material-ui
import { Box, Chip, Grid, Stack, Typography } from "@mui/material";

// project import
import MainCard from "../../MainCard";

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticsCard = ({
  color = "primary",
  title,
  count,
  percentage,
  description,
  extra,
}) => (
  <MainCard contentSX={{ p: 2.25, display: "flex", justifyContent: "center" }}>
    <Stack spacing={0.5}>
      <Typography variant="h6" color="textSecondary">
        {title}
      </Typography>
      <Grid container alignItems="center">
        <Grid item>
          <Typography variant="h4" color="inherit">
            {count} lei
          </Typography>
        </Grid>
        {percentage && (
          <Grid item>
            <Chip
              variant="combined"
              color={color}
              label={`${percentage}%`}
              sx={{ ml: 1.25, pl: 1 }}
              size="small"
            />
          </Grid>
        )}
      </Grid>
    </Stack>
    {extra?.length > 0 && (
      <Box sx={{ pt: 2.25 }}>
        <Typography variant="caption" color="textSecondary">
          {description}{" "}
          <Typography
            component="span"
            variant="caption"
            sx={{ color: `${color || "primary"}.main` }}
          >
            {extra}
          </Typography>{" "}
          this month
        </Typography>
      </Box>
    )}
  </MainCard>
);

export default AnalyticsCard;
