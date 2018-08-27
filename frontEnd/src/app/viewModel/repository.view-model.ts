
export class RepositoryViewModel {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    constructor(repository) {
        this.id = repository.id != null ? repository.id : null;
        this.name = repository.name != null ? repository.name : null;
        this.full_name =  repository.full_name != null ? repository.full_name : null;
        this.html_url = repository.html_url != null ? repository.html_url : null;
    }
}
