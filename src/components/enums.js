import {Enumeration} from '@/utilities/enums'

const AttributeTypes = new Enumeration({
  Rating: 'Image',
  String: 'Text'
})

const CADDrawingTypes = new Enumeration({
  Generated: 1,
  Local: 2
})

const ConfiguratorResultsPage = 'Configurator-Search-Results'

const DownloadFormats = [
  {
    text: 'Choose a CAD format',
    value: ''
  },
  {
    text: 'Solidworks (.stp)',
    value: 'Solidworks (.stp)'
  },
  {
    text: 'Solidworks FeatureWorks (.prt)',
    value: 'Solidworks FeatureWorks (.prt)'
  },
  {
    text: 'Creo Parametric 3.0/2.0 (.prt)',
    value: 'Creo Parametric 3.0/2.0 (.prt)'
  },
  {
    text: 'Pro/ENGINEER Wildfire/2001 (.neu)',
    value: 'Pro/ENGINEER Wildfire/2001 (.neu)'
  },
  {
    text: 'Pro/ENGINEER Neutral (.neu)',
    value: 'Pro/ENGINEER Neutral (.neu)'
  },
  {
    text: 'Autodesk Inventor (.stp)',
    value: 'Autodesk Inventor (.stp)'
  },
  {
    text: 'Parasolid (.x_t)',
    value: 'Parasolid (.x_t)'
  },
  {
    text: 'AutoCAD 3D (.sat)',
    value: 'AutoCAD 3D (.sat)'
  },
  {
    text: 'CATIA V5 (.igs)',
    value: 'CATIA V5 (.igs)'
  },
  {
    text: 'CATIA V4 (.igs)',
    value: 'CATIA V4 (.igs)'
  },
  {
    text: 'IGES (.igs)',
    value: 'IGES (.igs)'
  },
  {
    text: 'STEP (.stp)',
    value: 'STEP (.stp)'
  },
  {
    text: 'ANVIL (.stp)',
    value: 'ANVIL (.stp)'
  },
  {
    text: 'CADKey 3D (.stp)',
    value: 'CADKey 3D (.stp)'
  },
  {
    text: 'IronCAD (.stp)',
    value: 'IronCAD (.stp)'
  },
  {
    text: 'Mechanical Desktop (.stp)',
    value: 'Mechanical Desktop (.stp)'
  },
  {
    text: '3D PDF (.pdf)',
    value: '3D PDF (.pdf)'
  },
  {
    text: 'ACIS (.sat)',
    value: 'ACIS (.sat)'
  },
  {
    text: 'SDRC I-DEAS (.stp)',
    value: 'SDRC I-DEAS (.stp)'
  },
  {
    text: 'Unigraphics (.stp)',
    value: 'Unigraphics (.stp)'
  },
  {
    text: 'AutoCAD 2D (.dxf)',
    value: 'AutoCAD 2D (.dxf)'
  },
  {
    text: 'DXF file (.dxf)',
    value: 'DXF file (.dxf)'
  },
  {
    text: 'eDrawings (R) 2D (.dxf)',
    value: 'eDrawings (R) 2D (.dxf)'
  },
]

const ListType = new Enumeration({
  Application: 1,
  Series: 2
})

const MenuStorage = new Enumeration({
  Casters: 'CastersApplicationLinks',
  Wheels: 'WheelsApplicationLinks'
})

const ProductSeries = new Enumeration({
  Wheels: 1,
  Casters: 3
})

const ProductTypes = new Enumeration({
  Casters: 0,
  Wheels: 1
})

const SessionStorageKeys = [
  'ConfiguratorType',
  'Pagination',
  'SortOrder',
  'SortBy',
  'SelectedAttributes_Casters',
  'SelectedAttributes_Wheels'
]

const ScrollToResults = 'scrollToResults'

export {
  AttributeTypes,
  CADDrawingTypes,
  ConfiguratorResultsPage,
  DownloadFormats,
  ListType,
  MenuStorage,
  ProductSeries,
  ProductTypes,
  SessionStorageKeys,
  ScrollToResults
}
