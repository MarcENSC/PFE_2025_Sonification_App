import React from 'react';
import ChartBarIcon from '@atlaskit/icon/core/chart-bar';
import PulseIcon from '@atlaskit/icon/core/pulse';
import DataFlowIcon from '@atlaskit/icon/core/data-flow';
import AngleBracketsIcon from '@atlaskit/icon/core/angle-brackets';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';

interface DropdownItemDescriptionExampleProps {
  onSelectCategory: (category: string) => void;
}

const DropdownItemDescriptionExample: React.FC<DropdownItemDescriptionExampleProps> = ({ onSelectCategory }) => {
  return (
    <DropdownMenu trigger="Components" shouldRenderToParent>
      <DropdownItemGroup>
        <DropdownItem
          elemBefore={<DataFlowIcon label="Data Flow Icon" />}
          description="Structuration tools"
          onClick={() => onSelectCategory('Structure')}
        >
          Structure
        </DropdownItem>
        <DropdownItem
          elemBefore={<ChartBarIcon label="Chart bar icon" />}
          description="Analysis tools"
          onClick={() => onSelectCategory('Analyse')}
        >
          Analyse
        </DropdownItem>
        <DropdownItem
          elemBefore={<AngleBracketsIcon label="Angle Brackets Icon" />}
          description="Javascripts scripts"
          onClick={() => onSelectCategory('Scripts')}
        >
          Scripts
        </DropdownItem>
        <DropdownItem
          elemBefore={<PulseIcon label="Audio Icon" />}
          description="Audios tools"
          onClick={() => onSelectCategory('Audio')}
        >
          Audio
        </DropdownItem>
      </DropdownItemGroup>
    </DropdownMenu>
  );
};

export default DropdownItemDescriptionExample;