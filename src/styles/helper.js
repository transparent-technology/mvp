export const getIconProps = resource => {
  switch (resource) {
    case "ColdWaterSupply":
      return {
        type: "resource_water",
        fill: "#79AFFF"
      }
    case "HotWaterSupply":
      return {
        type: "resource_water",
        fill: "#FF8C68"
      }
    case "Heat":
      return {
        type: "resource_heat",
        fill: "#272F5A"
      }
    default:
      return {
        type: "resource_device",
        fill: "#272F5A"
      }
  }
}
