import { IterableDictPipe } from './iterableDictPipe';
import { TestBed, inject } from '@angular/core/testing';

const dict = {
    'artist1': { 'name': 'test1' },
    'artist2': { 'name': 'test2' }
};

describe('Pipe: IterableDictPipe', () => {
    let pipe;

    beforeEach(() => TestBed.configureTestingModule({
        providers: [IterableDictPipe]
    }));

    beforeEach(inject([IterableDictPipe], p => {
        pipe = p;
    }));

    it('should make an iterable object', () => {
        expect(pipe.transform(dict).length).toEqual(2);
        expect(pipe.transform(dict)[0].value.name).toEqual('test1');
        expect(pipe.transform(dict)[1].value.name).toEqual('test2');
    });
});
