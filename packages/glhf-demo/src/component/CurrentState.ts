import Component from "../../../glhf-ecs/src/Component";

interface CurrentStateProps {
    stateName: string;
}

export default class CurrentState extends Component {
    constructor(public properties: CurrentStateProps) {
        super(properties);
    }
}